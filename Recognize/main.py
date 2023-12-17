from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from azure.core.credentials import AzureKeyCredential
from azure.ai.formrecognizer import DocumentAnalysisClient

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








