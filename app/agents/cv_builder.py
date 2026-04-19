# create the cv
from fastapi import APIRouter
from schema.cv_schema import CvRequest


router=APIRouter(tags=['create-cv'],prefix='/gen')

@router.post('/receive-cv')
def receive_cv(data:CvRequest):
    return process_data(data)


def process_data(data):
    print(f"First Name: {data.firstName}")

