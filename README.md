# RAGThema3

Minimalistische Nederlandstalige OER-chatbot met RAG, Ollama en een vanilla
HTML/CSS/JavaScript-interface.

## Benodigde bestanden

| Bestand | Functie |
|---|---|
| `FormatUitwerkingThema-opdracht - Copy (1).ipynb` | Hoofdnotebook met PDF-verwerking, chunks, embeddings, RAG en deploymentserver. |
| `Opleidingsdeel OER Bachelor ICT voltijd Almere 2026-2027.pdf` | Kennisbron voor de chatbot. |
| `index.html` | Chatbotinterface. |
| `script.js` | Stuurt vragen naar de lokale Python-webserver en toont antwoorden. |
| `style.css` | Styling van de interface. |
| `requirements.txt` | Python-afhankelijkheden voor de notebook en RAG-pipeline. |

De bestanden `oerbotje.pdf`, `Week 3.html`, `model.ipynb` en
`RAG implementation using Keras_NLP and ChromaDB.ipynb` zijn
achtergrond- en prototypebestanden. Ze zijn niet nodig om de deployment te
starten.

## Vereisten

- Python 3.11, bij voorkeur de Miniconda-omgeving `AI_2526_py311`.
- Jupyter Notebook of JupyterLab.
- Ollama.
- Het model `qwen2.5:3b`.

Installeer de Python-pakketten in de geselecteerde omgeving:

```bash
conda activate AI_2526_py311
python -m pip install -r requirements.txt
```

Installeer en start daarna het Ollama-model:

```bash
ollama pull qwen2.5:3b
ollama serve
```

Laat `ollama serve` actief tijdens het gebruik van de chatbot.

## Deployment starten

1. Open `FormatUitwerkingThema-opdracht - Copy (1).ipynb`.
2. Selecteer de Python-interpreter `AI_2526_py311`.
3. Voer de notebookcellen vanaf het begin uit. Hierdoor worden de PDF, chunks
   en embeddings geladen.
4. Voer daarna de deploymentcel uit die begint met:

   ```python
   #hier verder deployment
   ```

5. Open in de browser:

   ```text
   http://localhost:8000
   ```

De deployment gebruikt een ingebouwde Python-webserver. De server verwerkt
`index.html`, `style.css`, `script.js` en de API-route `POST /api/chat`.
De browser gebruikt geen framework en ChromaDB wordt niet gebruikt in deze
deploymentvariant. De cosine-similarity wordt rechtstreeks in Python
berekend.

## Belangrijk

Start niet tegelijk een gewone server met:

```bash
python -m http.server 8000
```

Deze server ondersteunt geen `POST /api/chat` en veroorzaakt daarom een
`501 Unsupported method ('POST')`. Gebruik uitsluitend de deploymentcel uit
de notebook.
