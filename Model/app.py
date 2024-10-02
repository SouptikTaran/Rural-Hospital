# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.feature_extraction.text import CountVectorizer
# from sklearn.naive_bayes import MultinomialNB
# from sklearn.pipeline import make_pipeline


# data = pd.read_csv('dataset.csv')
# data['symptoms'] = data['symptoms'].str.replace(',', ' ')
# X = data['symptoms']
# y = data[['disease', 'doctor', 'risk level', 'cures']]
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
# model = make_pipeline(CountVectorizer(), MultinomialNB())
# model.fit(X_train, y_train['disease'])

# def predict(symptoms):
#     disease_probs = model.predict_proba([symptoms])[0]
#     disease_indices = disease_probs.argsort()[::-1]
#     possible_diseases = []
#     for idx in disease_indices:
#         disease = model.classes_[idx]
#         probability = disease_probs[idx]
#         if probability > 0:
#             doctor = data.loc[data['disease'] == disease, 'doctor'].values[0]
#             risk_level = data.loc[data['disease'] == disease, 'risk level'].values[0]
#             cure = data.loc[data['disease'] == disease, 'cures'].values[0]
#             possible_diseases.append({
#                 'disease': disease,
#                 'probability': probability,
#                 'doctor': doctor,
#                 'risk level': risk_level,
#                 'cure': cure
#             })
#     return possible_diseases
# def get_predictions():
#     symptoms = input("Enter symptoms separated by commas: ").replace(',', ' ')
#     predictions = predict(symptoms)
#     if not predictions:
#         print("No diseases found for the given symptoms. Please provide more symptoms.\n")
#         return
#     for prediction in predictions:
#         probability_formatted = f"{prediction['probability']:.2f}"
#         if probability_formatted != "0.00":
#             print(f"Disease: {prediction['disease']}, Probability: {probability_formatted}")
#             print(f"Doctor: {prediction['doctor']}")
#             print(f"Risk Level: {prediction['risk level']}")
#             print(f"Cure: {prediction['cure']}\n")

# if __name__ == "__main__":
#     get_predictions()

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from flask import Flask, request, jsonify

# Load and prepare the dataset
data = pd.read_csv('dataset.csv')
data['symptoms'] = data['symptoms'].str.replace(',', ' ')
X = data['symptoms']
y = data[['disease', 'doctor', 'risk level', 'cures']]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = make_pipeline(CountVectorizer(), MultinomialNB())
model.fit(X_train, y_train['disease'])

# Initialize Flask app
app = Flask(__name__)

def predict(symptoms):
    disease_probs = model.predict_proba([symptoms])[0]
    disease_indices = disease_probs.argsort()[::-1]
    
    possible_diseases = []
    
    for idx in disease_indices:
        probability = disease_probs[idx]
        if probability > 0:
            disease = model.classes_[idx]
            doctor = data.loc[data['disease'] == disease, 'doctor'].values[0]
            risk_level = data.loc[data['disease'] == disease, 'risk level'].values[0]
            cure = data.loc[data['disease'] == disease, 'cures'].values[0]
            
            possible_diseases.append({
                'disease': disease,
                'probability': f"{probability:.2f}",
                'doctor': doctor,
                'risk_level': risk_level,
                'cure': cure
            })
    
    return possible_diseases[:3]

@app.route('/predict', methods=['POST'])
def get_predictions():
    # Get the JSON data from the request
    data = request.get_json()
    symptoms = data.get('symptoms', '').replace(',', ' ')
    
    predictions = predict(symptoms)
    if not predictions:
        return jsonify({"message": "No diseases found for the given symptoms."}), 404
    
    return jsonify(predictions)

if __name__ == "__main__":  
    app.run(host="0.0.0.0", port=5000)
