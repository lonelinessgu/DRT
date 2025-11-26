from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
import logging

from backend.core.pipeline import model, vectorizer
from backend.db_models.storage import Link, Stat

predict_router = APIRouter()
logger = logging.getLogger(__name__)


class PredictRequest(BaseModel):
    article: str
    source: str = None


@predict_router.post("/predict")
async def predict_price(request: PredictRequest):
    try:
        logger.debug("Processing prediction request")
        new_text = request.article
        new_text_vectorized = vectorizer.transform([new_text]).toarray()
        probabilities = model.predict_proba(new_text_vectorized)

        predicted_class = probabilities.argmax()
        predicted_probability = probabilities[0][predicted_class]

        if predicted_class == 0:
            prediction_result = "Фейк"
            is_fake = True
        else:
            prediction_result = "Правда"
            is_fake = False

        predicted_probability = str(int(float(f"{predicted_probability:.2f}") * 100))
        logger.debug(f"Prediction completed: {prediction_result} with {predicted_probability}% confidence")

        if request.source:
            existing_link = await Link.filter(url=request.source).first()
            if existing_link:
                link = existing_link
            else:
                link = await Link.create(url=request.source)

            stat = await Stat.filter(link=link).first()
            if not stat:
                stat = await Stat.create(link=link)

            if is_fake:
                await stat.increment_fake()
            else:
                await stat.increment_truthful()

        return {"predicted_class": prediction_result, "predicted_probability": predicted_probability}

    except ValueError as e:
        logger.warning(f"Invalid input: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid input data"
        )
    except Exception as e:
        logger.warning(f"Prediction failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Prediction failed"
        )