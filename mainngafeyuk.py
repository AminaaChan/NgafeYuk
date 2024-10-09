# Class Admin | Dewi Aminah Chan
class Admin:
    def __init__(self, id_admin, nama_admin, email_admin, pass_admin, role_admin):
        self.id_admin = id_admin
        self.nama_admin = nama_admin
        self.email_admin = email_admin
        self.pass_admin = pass_admin
        self.login_admin = False  # default not logged in
        self.role_admin = role_admin

    def login(self, email, password):
        if email == self.email_admin and password == self.pass_admin:
            self.login_admin = True
            print(f"{self.nama_admin} logged in as Admin.")
        else:
            print("Login failed!")

# Class User | Hana Setia Putri Ayu Reghina
class User:
    def __init__(self, id_user, nama_user, email_user, pass_user, role_user):
        self.id_user = id_user
        self.nama_user = nama_user
        self.email_user = email_user
        self.pass_user = pass_user
        self.login_user = False  # default not logged in
        self.role_user = role_user
        self.isRatingAllowed_user = True  # default diizinkan untuk memberi rating

    def login(self, email, password):
        if email == self.email_user and password == self.pass_user:
            self.login_user = True
            print(f"{self.nama_user} logged in as User.")
        else:
            print("Login failed!")

# Class Informasi Cafe | Zahra Puspita Paramastri 
class Cafe:
    def __init__(self, id_cafe, nama_cafe, lokasi_cafe, rating_cafe, deskripsi_cafe, gambar_cafe):
        self.id_cafe = id_cafe
        self.nama_cafe = nama_cafe
        self.lokasi_cafe = lokasi_cafe
        self.rating_cafe = rating_cafe
        self.deskripsi_cafe = deskripsi_cafe
        self.gambar_cafe = gambar_cafe
        self.ulasan_cafe = []  # Menyimpan ulasan dalam bentuk list

    def display_info(self):
        print(f"Nama Cafe: {self.nama_cafe}\nLokasi: {self.lokasi_cafe}\nRating: {self.rating_cafe}\nDeskripsi: {self.deskripsi_cafe}")
        print("\nUlasan:")
        for ulasan in self.ulasan_cafe:
            print(f"- {ulasan.ulasan_user} (Rating: {ulasan.rate_user}) pada {ulasan.tanggalRate_user}")

    def add_ulasan(self, ulasan_user):
        self.ulasan_cafe.append(ulasan_user)
        # Update rating secara dinamis berdasarkan ulasan baru
        total_rating = sum([ulasan.rate_user for ulasan in self.ulasan_cafe])
        self.rating_cafe = total_rating / len(self.ulasan_cafe)

# Class Rating & Ulasan User | Zahra Puspita Paramastri 
class RatingUser:
    def __init__(self, rate_user, ulasan_user, tanggalRate_user):
        self.rate_user = rate_user
        self.ulasan_user = ulasan_user
        self.tanggalRate_user = tanggalRate_user

# Pencarian Cafe | Gea Amarlinda Sassy Mardika 
def search_cafe(cafe_list, searchNama_cafe):
    result = [cafe for cafe in cafe_list if searchNama_cafe.lower() in cafe.nama_cafe.lower()]
    if result:
        for cafe in result:
            cafe.display_info()
    else:
        print("Cafe not found!")

# Filter Berdasarkan Rating Cafe | Zahra Puspita Paramastri 
def filter_cafe_by_rating(cafe_list, filterRating_cafe):
    result = [cafe for cafe in cafe_list if cafe.rating_cafe >= filterRating_cafe]
    if result:
        for cafe in result:
            cafe.display_info()
    else:
        print(f"No cafe found with rating >= {filterRating_cafe}")

# Registrasi Admin dan User | Dewi Aminah Chan
def register_admin(admin_list, id_admin, nama_admin, email_admin, pass_admin, role_admin):
    admin = Admin(id_admin, nama_admin, email_admin, pass_admin, role_admin)
    admin_list.append(admin)
    print("Admin registered successfully!")

def register_user(user_list):
    id_user = len(user_list) + 1
    nama_user = input("Masukkan nama user: ")
    email_user = input("Masukkan email user: ")
    pass_user = input("Masukkan password user: ")
    role_user = input("Masukkan role user (contoh: regular): ")
    user = User(id_user, nama_user, email_user, pass_user, role_user)
    user_list.append(user)
    print("User registered successfully!")

# Login Admin dan User | Dewi Aminah Chan | Hana Setia Putri Ayu Reghina
def login_admin(admin_list):
    email = input("Masukkan email admin: ")
    password = input("Masukkan password admin: ")
    for admin in admin_list:
        if admin.email_admin == email and admin.pass_admin == password:
            admin.login(email, password)
            return admin
    print("Login admin gagal!")
    return None

def login_user(user_list):
    email = input("Masukkan email user: ")
    password = input("Masukkan password user: ")
    for user in user_list:
        if user.email_user == email and user.pass_user == password:
            user.login(email, password)
            return user
    print("Login user gagal!")
    return None

# Memberikan Rating dan Ulasan dari file | Zahra Puspita Paramastri
def berikan_rating_dan_ulasan_dari_file(cafe_list, file_path):
    try:
        with open(file_path, 'r') as file:
            for line in file:
                if line.strip():  # Skip empty lines
                    cafe_id, rating, ulasan, tanggal = line.strip().split(', ')
                    cafe_terpilih = next((cafe for cafe in cafe_list if cafe.id_cafe == int(cafe_id)), None)

                    if cafe_terpilih:
                        rating_user = RatingUser(float(rating), ulasan.strip('"'), tanggal)
                        cafe_terpilih.add_ulasan(rating_user)
                        print(f"Rating dan ulasan berhasil ditambahkan untuk {cafe_terpilih.nama_cafe}!")
                    else:
                        print(f"Cafe dengan ID {cafe_id} tidak ditemukan!")
    except FileNotFoundError:
        print(f"File {file_path} tidak ditemukan!")

# Main Program
if __name__ == "__main__":
    # List untuk menyimpan admin dan user yang didaftarkan
    admin_list = []
    user_list = []
    
    # Menambahkan Admin secara otomatis | Dewi Aminah Chan
    register_admin(admin_list, 1, "Admin1", "dewiaminahchan.com", "password001", "superadmin")
    register_admin(admin_list, 2, "Admin2", "zahrapuspitaparamastri.com", "password002", "moderator")
    
    # List cafe | Gea Amarlinda Sassy Mardika
    cafe1 = Cafe(1, "Cafe Indah", "Jl. Merpati 1", 4.5, "Tempat nyaman untuk bersantai.", "gambar1.jpg")
    cafe2 = Cafe(2, "Cafe Harmoni", "Jl. Anggrek 2", 3.9, "Cocok untuk kerja dan diskusi.", "gambar2.jpg")
    cafe3 = Cafe(3, "Cafe Santai", "Jl. Kenari 3", 4.2, "Pelayanan ramah dan makanan enak.", "gambar3.jpg")
    cafe_list = [cafe1, cafe2, cafe3]

    user_logged_in = None  # Variabel untuk menyimpan status login user | Gea Amarlinda Sassy Mardika

    while True:
        print("\n==== Sistem Cafe ====")
        print("1. Daftar User")
        print("2. Login Admin")
        print("3. Login User")
        print("4. Cari Cafe")
        print("5. Filter Cafe Berdasarkan Rating")
        print("6. Berikan Rating dan Ulasan dari File")
        print("7. Exit")

        pilihan = input("Pilih menu: ")

        if pilihan == "1":
            register_user(user_list)
        elif pilihan == "2":
            admin_logged_in = login_admin(admin_list)
        elif pilihan == "3":
            user_logged_in = login_user(user_list)
        elif pilihan == "4":
            searchNama_cafe = input("\nMasukkan nama cafe yang ingin dicari: ")
            search_cafe(cafe_list, searchNama_cafe)
        elif pilihan == "5":
            filterRating_cafe = float(input("\nMasukkan filter rating (contoh: 4.0): "))
            filter_cafe_by_rating(cafe_list, filterRating_cafe)
        elif pilihan == "6":
            berikan_rating_dan_ulasan_dari_file(cafe_list, 'ratings.txt')  # Ganti dengan path yang sesuai
        elif pilihan == "7":
            print("Terima kasih telah menggunakan sistem!")
            break
        else:
            print("Pilihan tidak valid, silakan coba lagi.")

# Mengakhiri program
print("Program telah selesai.")
