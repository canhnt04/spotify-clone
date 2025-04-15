# spotify-clone

# 1. Tạo virtual environment

python -m venv venv

# 2. Di chuyển vào thư mục backend

cd spotify-clone/backend

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

# django-admin startapp accounts

Tạo app accounts để xử lý chức năng liên quan đến người dùng:

Đăng ký, đăng nhập

Thông tin cá nhân (profile)

Xác thực, phân quyền

# django-admin startapp media

Tạo app media để quản lý nội dung đa phương tiện:

Bài hát (Song)

Video âm nhạc (Video)

Nghệ sĩ (Artist)

Thể loại (Genre)

# django-admin startapp usercontent

Tạo app usercontent cho nội dung người dùng tạo:

Tạo album

Danh sách bài hát yêu thích (Favorites)
