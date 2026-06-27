## used in 
-- Hospital_Analysis_Dashboard - power bi
# DataFormat Converter

A professional Python web application for converting Excel (XLSX) files to CSV and CSV files to Excel (XLSX). Supports single file and bulk folder conversions with ZIP downloads for multiple files.

## Features

- Convert XLSX to CSV
- Convert CSV to XLSX
- Single file upload and download
- Bulk conversion from folder or multiple files
- ZIP download for bulk conversions
- Professional, clean UI

## Installation

1. Clone or download the project.
2. Navigate to the project directory.
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

## Running the App

Run the Flask application:
```
python app.py
```

Open your browser and go to `http://127.0.0.1:5000/`.

## Usage

1. Select the conversion type (XLSX to CSV or CSV to XLSX).
2. Upload files or select a folder.
3. Click "Convert and Download" to process and download the converted files.

## Requirements

- Python 3.7+
- Flask
- Pandas
- OpenPyXL