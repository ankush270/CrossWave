import cv2
# import numpy as np
import easyocr
from ultralytics import YOLO
from huggingface_hub import hf_hub_download
import sys
import json

model_path = hf_hub_download(repo_id="arnabdhar/YOLOv8-nano-aadhar-card", filename="model.pt")
model = YOLO(model_path)

reader = easyocr.Reader(['en'])


local_image_path = sys.argv[1]

image = cv2.imread(local_image_path)

results = model(local_image_path)
output = []

for result in results:
    boxes = result.boxes
    names = result.names

    for box in boxes:
        x1, y1, x2, y2 = map(int, box.xyxy[0])  
        label = names[int(box.cls[0].item())]  
        cropped = image[y1:y2, x1:x2]

        gray_cropped = cv2.cvtColor(cropped, cv2.COLOR_BGR2GRAY)

        result_text = reader.readtext(gray_cropped, detail=0)  # detail=0 gives only text

        text = ' '.join(result_text)

        output.append({"label": label, "text": text})
        print(f"Label: {label}, Extracted Text: {' '.join(result_text)}")

print(json.dumps(output))
sys.stdout.flush()