==== các bước run html  ==== 

1. pull code mới về:  

mở terminal: git pull origin main --force 

2. run html:

Chọn file html cần chạy ( ví dụ: index.html )

click "Go Live" chân trang góc phải màn hình 






====== Nếu máy chưa cài đặt github thì làm theo các bước sau ==================

### Bước 1: Cài Git cho máy

Nếu bạn chưa cài Git, tải tại:
https://git-scm.com/downloads


### Bước 2: Kiểm tra Git đã cài chưa
Mở Git Bash hoặc CMD:
git --version

----- nếu không có thử kiểm tra PATH bằng tay
1.Chuột phải This PC → Properties

2.Advanced system settings

3.Environment Variables

4.Ở bảng trên, tìm Path → Edit

5.Kiểm tra xem có dòng nào giống:
C:\Program Files\Git\cmd
C:\Program Files\Git\bin

6.Nếu không có, bạn bấm New rồi thêm 2 dòng đó → OK → Restart CMD.


### Bước 3: Tạo SSH key

Chạy lệnh:

ssh-keygen -t ed25519 -C "youremail@gmail.com" (comment để bạn nhận biết key )

---- Sau đó bật key agent trong cmd:

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

---- Trong PowerShell (run as Admin) chạy được ở cmd rồi thì thôi:

Get-Service ssh-agent
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ed25519

### Bước 4: Copy SSH key

Chạy:

cat ~/.ssh/id_ed25519.pub

### Bước 5: Thêm SSH key vào GitHub

Vào GitHub → Settings → SSH and GPG keys → New SSH Key
Paste key → Save.

### bước 6: Thêm remote 

git remote add origin git@github.com:NguyenCongLuc2305/luxtrips-vn.git
git remote -v

### Bước 7: Pull code về

git pull origin main --force

### Bước 8: run html 
cài extension: live serve 
cài xong extension chọn file index.html và bấm Go live ( chân trang góc phải )