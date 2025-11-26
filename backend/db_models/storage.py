from tortoise.models import Model
from tortoise import fields
from enum import IntEnum


class TruthStatus(IntEnum):
    TRUTHFUL = 0
    FAKE = 1
    UNKNOWN = 2


class Link(Model):
    id = fields.IntField(primary_key=True)
    url = fields.CharField(max_length=255)
    truth = fields.IntEnumField(TruthStatus, default=TruthStatus.UNKNOWN)

    stats = fields.ReverseRelation["Stat"]

    async def get_stats(self):
        """Возвращает связанный объект Stat или создает новый"""
        stat = await Stat.filter(link_id=self.id).first()
        if not stat:
            stat = await Stat.create(link_id=self.id)
        return stat

    @property
    async def trust_score(self) -> float:
        """Возвращает процент достоверности от 0.0 до 1.0"""
        stat = await self.get_stats()
        total = stat.fake_count + stat.truthful_count
        if total == 0:
            return 0.5
        return stat.truthful_count / total

    @property
    async def total_votes(self) -> int:
        stat = await self.get_stats()
        return stat.fake_count + stat.truthful_count

    async def update_truth_status(self):
        """Обновляет статус на основе голосов"""
        stat = await self.get_stats()
        total = stat.fake_count + stat.truthful_count
        if total >= 10:
            fake_ratio = stat.fake_count / total
            self.truth = TruthStatus.FAKE if fake_ratio > 0.5 else TruthStatus.TRUTHFUL
            await self.save()


class Stat(Model):
    id = fields.IntField(primary_key=True)
    link = fields.ForeignKeyField("storage_db.Link", related_name="stats")
    fake_count = fields.IntField(default=0)
    truthful_count = fields.IntField(default=0)

    async def increment_fake(self):
        self.fake_count += 1
        await self.save()
        # Получаем связанный экземпляр Link напрямую по ID
        link_instance = await Link.get(id=self.link_id)
        await link_instance.update_truth_status()

    async def increment_truthful(self):
        self.truthful_count += 1
        await self.save()
        # Получаем связанный экземпляр Link напрямую по ID
        link_instance = await Link.get(id=self.link_id)
        await link_instance.update_truth_status()