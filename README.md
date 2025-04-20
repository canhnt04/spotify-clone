# spotify-clone

# Mở terminal với quyền administrator

Set-ExecutionPolicy RemoteSigned

# Tạo virtual environment

python -m venv venv

# Kích hoạt môi trường ảo (PowerShell)

.\venv\Scripts\Activate.ps1

# Cài đặt các thư viện cần thiết

pip install -r requirements.txt

# Di chuyển vào thư mục backend

cd spotify-clone/backend

# Setup file migrations

python manage.py makemigrations

# Chạy migration để tạo các bảng trong CSDL

python manage.py migrate

# (Tùy chọn) Tạo tài khoản admin để đăng nhập trang quản trị

python manage.py createsuperuser

# Chạy server

python manage.py runserver

# Hủy môi trường ảo

deactivate

# Export database

python manage.py dumpdata --indent 4 > data.json

# Import database

python manage.py loaddata data.json
