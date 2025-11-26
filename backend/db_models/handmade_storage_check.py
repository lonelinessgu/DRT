import asyncio
from tortoise import Tortoise
import logging

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def main():
    from backend.lifespan import init_db

    await init_db()

    try:
        from backend.db_models.storage import Link, Stat

        print("=== Таблица 'link' ===")
        links = await Link.all().prefetch_related('stats')

        if not links:
            print("Таблица 'link' пуста")
        else:
            for link in links:
                print(f"ID: {link.id}")
                print(f"URL: {link.url}")
                print(f"Truth status: {link.truth}")

                # Получаем связанную статистику
                stats = await link.get_stats()
                print(f"Fake count: {stats.fake_count}")
                print(f"Truthful count: {stats.truthful_count}")
                print(f"Trust score: {await link.trust_score:.2f}")
                print(f"Total votes: {await link.total_votes}")
                print("-" * 40)

        print(f"\n=== Таблица 'stat' ===")
        stats_all = await Stat.all()
        if not stats_all:
            print("Таблица 'stat' пуста")
        else:
            for stat in stats_all:
                print(
                    f"ID: {stat.id}, Link ID: {stat.link_id}, Fake: {stat.fake_count}, Truthful: {stat.truthful_count}")

    finally:
        await Tortoise.close_connections()


if __name__ == "__main__":
    asyncio.run(main())