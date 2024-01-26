from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from azure.core.credentials import AzureKeyCredential
from azure.ai.formrecognizer import DocumentAnalysisClient
import re
import json 

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

endpoint = "https://centralindia.api.cognitive.microsoft.com/"
key = "6b872b81a3df4d6eace4296eb80b0a4f"

@app.post("/api/analyze")
async def analyze_receipt(file: UploadFile = File(...)):
    try:
        document_analysis_client = DocumentAnalysisClient(endpoint=endpoint, credential=AzureKeyCredential(key))

        poller = document_analysis_client.begin_analyze_document("prebuilt-receipt", file.file)
        result = poller.result()

        item_descriptions = []

        for idx, receipt in enumerate(result.documents):
            if receipt.fields.get("Items"):
                for idx, item in enumerate(receipt.fields.get("Items").value):
                    item_description = item.value.get("Description")
                    if item_description:
                        item_descriptions.append(item_description.value)

        return {"items": item_descriptions}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


with open('Data.json', 'r') as file:
    medicines_data = json.load(file).get('sheet1', [])

with open('medicinesdata.json', 'r') as file:
    medicines_data = json.load(file).get('sheet1', [])


@app.post("/api/searchAlternativesFromPrescription")
async def search_alternatives_from_prescription(data: dict):
    try:
        print("data:", data)
        
        medicines = data.get('medicines', [])
        # print("all the medicines:", medicines)

        response = { "alternatives": {} }

        for medicine in medicines:
            alternatives = get_alternatives_for_medicine(medicine)
            response["alternatives"][medicine] = alternatives

        print("Complete Response:", response)
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def get_alternatives_for_medicine(search_term):
    matching_medicines = [
        medicine
        for medicine in medicines_data
       if re.search(re.escape(search_term.lower()), medicine["title"].lower()) or
           re.search(re.escape(search_term.lower()), medicine["description"].lower())
    ]

    return matching_medicines

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)




@app.post("/api/searchAlternativesFromPrescription")
async def search_alternatives_from_prescription(data: dict):
    try:
        print("data:", data)
        
        medicines = data.get('medicines', [])
        # print("all the medicines:", medicines)

        response = { "alternatives": {} }

        for medicine in medicines:
            alternatives = get_alternatives_for_medicine(medicine)
            response["alternatives"][medicine] = alternatives

        print("Complete Response:", response)
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def get_alternatives_for_medicine(search_term):
    matching_medicines = [
        medicine
        for medicine in medicines_data
       if re.search(re.escape(search_term.lower()), medicine["title"].lower()) or
           re.search(re.escape(search_term.lower()), medicine["composition"].lower())
    ]

    return matching_medicines

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)