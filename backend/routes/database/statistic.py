import logging
from fastapi import APIRouter, Depends, HTTPException
from backend.db_models.storage import Link

statistic_router = APIRouter()
logger = logging.getLogger(__name__)

@statistic_router.get("/statistic")
async def get_all_tokens():
    links = await Link.all()
    return {
        "links": [
            {
                "url": link.url,
                "trust_score": round(await link.trust_score*100, 2),
                "total_votes": await link.total_votes
            }
            for link in links
        ]
    }