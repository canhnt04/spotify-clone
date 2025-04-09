# spotify-clone
# Config Backend
# 1. Di chuyển vào thư mục backend
cd spotify-clone/backend

# 2. Tạo virtual environment
python -m venv venv

# 3. Kích hoạt môi trường ảo (PowerShell)
.\venv\Scripts\Activate.ps1

# 4. Cài đặt các thư viện cần thiết
pip install -r requirements.txt

# 5. Chạy migration để tạo các bảng trong CSDL
python manage.py migrate

# 6. (Tùy chọn) Tạo tài khoản admin để đăng nhập trang quản trị
python manage.py createsuperuser

# 7. Chạy server
python manage.py runserver
