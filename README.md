# Hướng dẫn cài đặt FRONTEND

## 1. Tại thư mục gốc spotify-clone

cd frontend

## 2. Mở terminal và gõ lệnh

npm i

## 3. Sau khi các package cần thiết được cài đặt thì gõ lệnh sau

npm run dev

## 4. Terminal sẽ hiện đường link để chạy ứng dụng trên trình duyệt (VD: https://localhost:5173)

# Hướng dẫn cài đặt BACKEND

## 1. Mở terminal với quyền administrator

Set-ExecutionPolicy RemoteSigned

## 2. Tạo virtual environment

python -m venv venv

## 3. Kích hoạt môi trường ảo (PowerShell)

.\venv\Scripts\Activate.ps1

## 4. Cài đặt các thư viện cần thiết

pip install -r requirements.txt

## 5. Di chuyển vào thư mục backend

cd spotify-clone/backend

## 6. Setup file migrations

python manage.py makemigrations

## 7. Chạy migration để tạo các bảng trong CSDL

python manage.py migrate

## (Tùy chọn) Tạo tài khoản admin để đăng nhập trang quản trị

python manage.py createsuperuser

## 8. Chạy server

python manage.py runserver

## 9. Hủy môi trường ảo

deactivate

## 10. Export database

python manage.py dumpdata --indent 4 > data.json

## 11. Import database

python manage.py loaddata data.json
