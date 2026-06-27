from flask import Flask, render_template, request, send_file, flash, redirect, url_for
import pandas as pd
import os
from werkzeug.utils import secure_filename
import zipfile
import io
import tempfile

app = Flask(__name__)
app.secret_key = "your_secret_key_here"  # Change this to a secure key

UPLOAD_FOLDER = tempfile.gettempdir()
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 100 * 1024 * 1024  # 100MB limit

ALLOWED_EXTENSIONS = {"xlsx", "csv"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/download/<filename>")
def download_zip(filename):
    zip_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    if os.path.exists(zip_path):
        response = send_file(zip_path, as_attachment=True, download_name=filename)

        @response.call_on_close
        def cleanup():
            os.remove(zip_path)

        return response
    else:
        flash("File not found")
        return redirect(url_for("index"))


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        conversion_type = request.form.get("conversion_type")
        if "files" not in request.files:
            flash("No file part")
            return redirect(request.url)
        files = request.files.getlist("files")
        if not files or all(file.filename == "" for file in files):
            flash("No selected file")
            return redirect(request.url)

        converted_files = []
        for file in files:
            if file and file.filename and allowed_file(file.filename):
                filename = secure_filename(os.path.basename(file.filename))
                filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
                file.save(filepath)

                # Determine target extension
                if conversion_type == "xlsx_to_csv":
                    if filename.lower().endswith(".xlsx"):
                        df = pd.read_excel(filepath)
                        output_filename = filename.rsplit(".", 1)[0] + ".csv"
                        output_path = os.path.join(
                            app.config["UPLOAD_FOLDER"], output_filename
                        )
                        df.to_csv(output_path, index=False)
                        converted_files.append((output_path, output_filename))
                elif conversion_type == "csv_to_xlsx":
                    if filename.lower().endswith(".csv"):
                        df = pd.read_csv(filepath)
                        output_filename = filename.rsplit(".", 1)[0] + ".xlsx"
                        output_path = os.path.join(
                            app.config["UPLOAD_FOLDER"], output_filename
                        )
                        df.to_excel(output_path, index=False)
                        converted_files.append((output_path, output_filename))

                # Clean up original file
                os.remove(filepath)

        if not converted_files:
            flash("No valid files converted")
            return redirect(request.url)

        # Always create ZIP
        memory_file = io.BytesIO()
        conversions = []
        with zipfile.ZipFile(memory_file, "w") as zf:
            for file_path, filename in converted_files:
                zf.write(file_path, filename)
                # Determine original name
                if conversion_type == "xlsx_to_csv":
                    original_name = filename.replace(".csv", ".xlsx")
                else:
                    original_name = filename.replace(".xlsx", ".csv")
                conversions.append(f"{original_name} to {filename}")
                os.remove(file_path)  # Clean up
        memory_file.seek(0)

        # Save ZIP temporarily
        zip_path = os.path.join(app.config["UPLOAD_FOLDER"], "converted_files.zip")
        with open(zip_path, "wb") as f:
            f.write(memory_file.getvalue())

        return render_template(
            "results.html", conversions=conversions, zip_name="converted_files.zip"
        )

    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
