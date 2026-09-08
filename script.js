// ========================================
// PWA INVENTARIS RUANGAN
// ========================================

const STORAGE_KEY = "inventarisRuangan";


// ========================================
// DATA CONTOH
// ========================================

const dataAwal = [

    {
        id: "INV001",
        nama: "Komputer Desktop",
        kode: "INV-LAB-001",
        ruangan: "Lab Komputer",
        jumlah: 20,
        kondisi: "Baik"
    },

    {
        id: "INV002",
        nama: "Monitor LED",
        kode: "INV-LAB-002",
        ruangan: "Lab Komputer",
        jumlah: 20,
        kondisi: "Baik"
    },

    {
        id: "INV003",
        nama: "Keyboard",
        kode: "INV-LAB-003",
        ruangan: "Lab Komputer",
        jumlah: 20,
        kondisi: "Baik"
    },

    {
        id: "INV004",
        nama: "Mouse",
        kode: "INV-LAB-004",
        ruangan: "Lab Komputer",
        jumlah: 18,
        kondisi: "Rusak Ringan"
    },

    {
        id: "INV005",
        nama: "Proyektor",
        kode: "INV-KLS-001",
        ruangan: "Ruang Kelas",
        jumlah: 5,
        kondisi: "Baik"
    },

    {
        id: "INV006",
        nama: "Meja Siswa",
        kode: "INV-KLS-002",
        ruangan: "Ruang Kelas",
        jumlah: 30,
        kondisi: "Baik"
    },

    {
        id: "INV007",
        nama: "Kursi Siswa",
        kode: "INV-KLS-003",
        ruangan: "Ruang Kelas",
        jumlah: 30,
        kondisi: "Rusak Ringan"
    },

    {
        id: "INV008",
        nama: "Rak Buku",
        kode: "INV-PUS-001",
        ruangan: "Perpustakaan",
        jumlah: 10,
        kondisi: "Baik"
    },

    {
        id: "INV009",
        nama: "Buku Pelajaran",
        kode: "INV-PUS-002",
        ruangan: "Perpustakaan",
        jumlah: 150,
        kondisi: "Baik"
    },

    {
        id: "INV010",
        nama: "Printer",
        kode: "INV-GRU-001",
        ruangan: "Ruang Guru",
        jumlah: 3,
        kondisi: "Rusak Berat"
    }

];


// ========================================
// LOAD LOCAL STORAGE
// ========================================

let inventaris;

try {

    inventaris = JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    );

} catch (error) {

    inventaris = null;

}


if (!Array.isArray(inventaris)) {

    inventaris = dataAwal;

    saveData();

}


// ========================================
// ELEMENT HTML
// ========================================

const inventoryForm =
    document.getElementById("inventoryForm");

const namaBarang =
    document.getElementById("namaBarang");

const kodeInventaris =
    document.getElementById("kodeInventaris");

const namaRuangan =
    document.getElementById("namaRuangan");

const jumlahBarang =
    document.getElementById("jumlahBarang");

const kondisiBarang =
    document.getElementById("kondisiBarang");

const editId =
    document.getElementById("editId");

const inventoryList =
    document.getElementById("inventoryList");

const searchInput =
    document.getElementById("searchInput");

const roomFilter =
    document.getElementById("roomFilter");

const conditionFilter =
    document.getElementById("conditionFilter");

const totalBarang =
    document.getElementById("totalBarang");

const barangBaik =
    document.getElementById("barangBaik");

const barangRusakRingan =
    document.getElementById("barangRusakRingan");

const barangRusakBerat =
    document.getElementById("barangRusakBerat");

const submitButton =
    document.getElementById("submitButton");

const cancelButton =
    document.getElementById("cancelButton");

const formTitle =
    document.getElementById("formTitle");

const darkModeBtn =
    document.getElementById("darkModeBtn");


// ========================================
// SIMPAN DATA
// ========================================

function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(inventaris)
    );

}


// ========================================
// SPLASH SCREEN
// ========================================

window.addEventListener(
    "load",
    function () {

        setTimeout(
            function () {

                const splash =
                    document.getElementById(
                        "splashScreen"
                    );

                const app =
                    document.getElementById(
                        "app"
                    );

                splash.classList.add(
                    "hidden"
                );

                app.classList.remove(
                    "hidden"
                );

            },
            1800
        );

    }
);


// ========================================
// DASHBOARD
// ========================================

function updateDashboard() {

    let total = 0;

    let baik = 0;

    let ringan = 0;

    let berat = 0;


    inventaris.forEach(
        function (item) {

            const jumlah =
                Number(item.jumlah) || 0;

            total += jumlah;


            if (
                item.kondisi ===
                "Baik"
            ) {

                baik += jumlah;

            } else if (
                item.kondisi ===
                "Rusak Ringan"
            ) {

                ringan += jumlah;

            } else if (
                item.kondisi ===
                "Rusak Berat"
            ) {

                berat += jumlah;

            }

        }
    );


    totalBarang.textContent =
        total;

    barangBaik.textContent =
        baik;

    barangRusakRingan.textContent =
        ringan;

    barangRusakBerat.textContent =
        berat;


    updateStatistics(
        baik,
        ringan,
        berat,
        total
    );

    updateRoomStatistics();

    updateAttention(
        ringan,
        berat
    );

}


// ========================================
// STATISTIK KONDISI
// ========================================

function updateStatistics(
    baik,
    ringan,
    berat,
    total
) {

    document.getElementById(
        "statBaik"
    ).textContent = baik;

    document.getElementById(
        "statRusakRingan"
    ).textContent = ringan;

    document.getElementById(
        "statRusakBerat"
    ).textContent = berat;


    const barBaik =
        document.getElementById(
            "barBaik"
        );

    const barRingan =
        document.getElementById(
            "barRusakRingan"
        );

    const barBerat =
        document.getElementById(
            "barRusakBerat"
        );


    if (total > 0) {

        barBaik.style.width =
            `${(baik / total) * 100}%`;

        barRingan.style.width =
            `${(ringan / total) * 100}%`;

        barBerat.style.width =
            `${(berat / total) * 100}%`;

    } else {

        barBaik.style.width = "0%";

        barRingan.style.width = "0%";

        barBerat.style.width = "0%";

    }

}


// ========================================
// STATISTIK RUANGAN
// ========================================

function updateRoomStatistics() {

    const container =
        document.getElementById(
            "roomStatistics"
        );

    container.innerHTML = "";


    if (
        inventaris.length === 0
    ) {

        container.innerHTML =
            "<p>Belum ada data.</p>";

        return;

    }


    const rooms = {};


    inventaris.forEach(
        function (item) {

            const room =
                item.ruangan ||
                "Tanpa Ruangan";

            const jumlah =
                Number(item.jumlah) || 0;


            if (!rooms[room]) {

                rooms[room] = 0;

            }

            rooms[room] += jumlah;

        }
    );


    const roomData =
        Object.entries(rooms)
            .sort(
                function (a, b) {
                    return b[1] - a[1];
                }
            );


    const max =
        roomData.length
            ? roomData[0][1]
            : 1;


    roomData.forEach(
        function ([room, jumlah]) {

            const percentage =
                (jumlah / max) * 100;


            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "room-stat-item";


            item.innerHTML = `

                <div class="room-stat-header">

                    <span>
                        ${escapeHTML(room)}
                    </span>

                    <strong>
                        ${jumlah} barang
                    </strong>

                </div>

                <div class="room-bar-background">

                    <div
                        class="room-bar"
                        style="width:${percentage}%"
                    ></div>

                </div>

            `;


            container.appendChild(item);

        }
    );

}


// ========================================
// PERLU PERHATIAN
// ========================================

function updateAttention(
    ringan,
    berat
) {

    const totalRusak =
        ringan + berat;


    const text =
        document.getElementById(
            "attentionText"
        );

    const button =
        document.getElementById(
            "attentionButton"
        );


    if (totalRusak === 0) {

        text.textContent =
            "Semua barang dalam kondisi baik.";

        button.style.display =
            "none";

        return;

    }


    text.textContent =
        `${totalRusak} barang dalam kondisi rusak dan perlu diperiksa.`;

    button.style.display =
        "block";

}


// ========================================
// TAMPILKAN INVENTARIS
// ========================================

function displayInventaris(
    data = inventaris
) {

    inventoryList.innerHTML = "";


    if (data.length === 0) {

        inventoryList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    📦
                </div>

                <h3>
                    Data tidak ditemukan
                </h3>

                <p>
                    Coba ubah kata pencarian
                    atau filter.
                </p>

            </div>

        `;

        return;

    }


    data.forEach(
        function (item) {

            let conditionClass =
                "condition-good";


            if (
                item.kondisi ===
                "Rusak Ringan"
            ) {

                conditionClass =
                    "condition-warning";

            } else if (
                item.kondisi ===
                "Rusak Berat"
            ) {

                conditionClass =
                    "condition-danger";

            }


            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "inventory-item";


            card.innerHTML = `

                <div class="inventory-info">

                    <div class="inventory-header">

                        <h3>
                            ${escapeHTML(item.nama)}
                        </h3>

                        <span
                            class="condition ${conditionClass}"
                        >
                            ${escapeHTML(item.kondisi)}
                        </span>

                    </div>


                    <div class="inventory-details">

                        <p>
                            <strong>Kode:</strong>
                            ${escapeHTML(item.kode)}
                        </p>

                        <p>
                            <strong>Ruangan:</strong>
                            ${escapeHTML(item.ruangan)}
                        </p>

                        <p>
                            <strong>Jumlah:</strong>
                            ${item.jumlah} barang
                        </p>

                    </div>

                </div>


                <div class="inventory-actions">

                    <button
                        type="button"
                        class="btn btn-edit"
                        onclick="editInventaris('${item.id}')"
                    >
                        ✏️ Edit
                    </button>

                    <button
                        type="button"
                        class="btn btn-delete"
                        onclick="deleteInventaris('${item.id}')"
                    >
                        🗑️ Hapus
                    </button>

                </div>

            `;


            inventoryList.appendChild(
                card
            );

        }
    );

}


// ========================================
// TAMBAH / EDIT DATA
// ========================================

inventoryForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const nama =
            namaBarang.value.trim();

        const kode =
            kodeInventaris.value.trim();

        const ruangan =
            namaRuangan.value.trim();

        const jumlah =
            Number(jumlahBarang.value);

        const kondisi =
            kondisiBarang.value;


        if (
            !nama ||
            !kode ||
            !ruangan ||
            jumlah < 1
        ) {

            alert(
                "Silakan isi semua data dengan benar."
            );

            return;

        }


        // ==============================
        // EDIT
        // ==============================

        if (editId.value) {

            const index =
                inventaris.findIndex(
                    function (item) {
                        return (
                            item.id ===
                            editId.value
                        );
                    }
                );


            if (index !== -1) {

                inventaris[index] = {

                    id: editId.value,

                    nama: nama,

                    kode: kode,

                    ruangan: ruangan,

                    jumlah: jumlah,

                    kondisi: kondisi

                };

            }


            alert(
                "Data inventaris berhasil diperbarui."
            );


        } else {


            // ==============================
            // TAMBAH
            // ==============================

            inventaris.push({

                id:
                    "INV-" +
                    Date.now(),

                nama: nama,

                kode: kode,

                ruangan: ruangan,

                jumlah: jumlah,

                kondisi: kondisi

            });


            alert(
                "Data inventaris berhasil ditambahkan."
            );

        }


        saveData();

        updateDashboard();

        updateRoomFilter();

        applyFilters();

        resetForm();

    }
);


// ========================================
// EDIT
// ========================================

function editInventaris(id) {

    const item =
        inventaris.find(
            function (data) {
                return data.id === id;
            }
        );


    if (!item) {
        return;
    }


    namaBarang.value =
        item.nama;

    kodeInventaris.value =
        item.kode;

    namaRuangan.value =
        item.ruangan;

    jumlahBarang.value =
        item.jumlah;

    kondisiBarang.value =
        item.kondisi;

    editId.value =
        item.id;


    formTitle.textContent =
        "Edit Data Inventaris";

    submitButton.textContent =
        "💾 Simpan Perubahan";

    cancelButton.classList.remove(
        "hidden"
    );


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ========================================
// HAPUS
// ========================================

function deleteInventaris(id) {

    const item =
        inventaris.find(
            function (data) {
                return data.id === id;
            }
        );


    if (!item) {
        return;
    }


    const yakin =
        confirm(
            "Apakah Anda yakin ingin menghapus data ini?"
        );


    if (!yakin) {
        return;
    }


    inventaris =
        inventaris.filter(
            function (data) {
                return data.id !== id;
            }
        );


    saveData();

    updateDashboard();

    updateRoomFilter();

    applyFilters();


    alert(
        "Data inventaris berhasil dihapus."
    );

}


// ========================================
// RESET FORM
// ========================================

function resetForm() {

    inventoryForm.reset();

    editId.value = "";

    formTitle.textContent =
        "Tambah Inventaris";

    submitButton.textContent =
        "➕ Simpan Data";

    cancelButton.classList.add(
        "hidden"
    );

    kondisiBarang.value =
        "Baik";

}


// ========================================
// BATAL EDIT
// ========================================

cancelButton.addEventListener(
    "click",
    function () {

        resetForm();

    }
);


// ========================================
// PENCARIAN
// ========================================

searchInput.addEventListener(
    "input",
    applyFilters
);


// ========================================
// FILTER RUANGAN
// ========================================

roomFilter.addEventListener(
    "change",
    applyFilters
);


// ========================================
// FILTER KONDISI
// ========================================

conditionFilter.addEventListener(
    "change",
    applyFilters
);


// ========================================
// GABUNGAN SEARCH + FILTER
// ========================================

function applyFilters() {

    const keyword =
        searchInput.value
            .toLowerCase()
            .trim();


    const room =
        roomFilter.value;


    const condition =
        conditionFilter.value;


    const hasil =
        inventaris.filter(
            function (item) {

                const nama =
                    String(
                        item.nama || ""
                    ).toLowerCase();

                const kode =
                    String(
                        item.kode || ""
                    ).toLowerCase();


                const cocokSearch =
                    nama.includes(
                        keyword
                    ) ||
                    kode.includes(
                        keyword
                    );


                const cocokRoom =
                    room === "all" ||
                    item.ruangan === room;


                const cocokCondition =
                    condition === "all" ||
                    item.kondisi ===
                        condition;


                return (
                    cocokSearch &&
                    cocokRoom &&
                    cocokCondition
                );

            }
        );


    displayInventaris(hasil);

}


// ========================================
// UPDATE FILTER RUANGAN
// ========================================

function updateRoomFilter() {

    const current =
        roomFilter.value;


    const rooms =
        [
            ...new Set(
                inventaris.map(
                    function (item) {
                        return item.ruangan;
                    }
                )
            )
        ].sort();


    roomFilter.innerHTML = `

        <option value="all">
            Semua Ruangan
        </option>

    `;


    rooms.forEach(
        function (room) {

            const option =
                document.createElement(
                    "option"
                );

            option.value = room;

            option.textContent = room;

            roomFilter.appendChild(
                option
            );

        }
    );


    if (
        rooms.includes(current)
    ) {

        roomFilter.value =
            current;

    } else {

        roomFilter.value =
            "all";

    }

}


// ========================================
// DARK MODE
// ========================================

function updateDarkModeIcon() {

    if (
        document.body.classList.contains(
            "dark"
        )
    ) {

        darkModeBtn.textContent =
            "☀️";

        darkModeBtn.title =
            "Light Mode";

    } else {

        darkModeBtn.textContent =
            "🌙";

        darkModeBtn.title =
            "Dark Mode";

    }

}


darkModeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark"
        );


        const dark =
            document.body.classList.contains(
                "dark"
            );


        localStorage.setItem(
            "darkMode",
            dark ? "on" : "off"
        );


        updateDarkModeIcon();

    }
);


// LOAD DARK MODE

if (
    localStorage.getItem(
        "darkMode"
    ) === "on"
) {

    document.body.classList.add(
        "dark"
    );

}

updateDarkModeIcon();


// ========================================
// TOMBOL BARANG RUSAK
// ========================================

document.getElementById(
    "attentionButton"
).addEventListener(
    "click",
    function () {

        searchInput.value = "";

        roomFilter.value = "all";

        conditionFilter.value =
            "all";


        const barangRusak =
            inventaris.filter(
                function (item) {

                    return (
                        item.kondisi ===
                            "Rusak Ringan" ||
                        item.kondisi ===
                            "Rusak Berat"
                    );

                }
            );


        displayInventaris(
            barangRusak
        );


        inventoryList.scrollIntoView({

            behavior: "smooth"

        });

    }
);


// ========================================
// EXPORT DATA
// ========================================

document.getElementById(
    "exportBtn"
).addEventListener(
    "click",
    function () {

        if (
            inventaris.length === 0
        ) {

            alert(
                "Tidak ada data untuk diexport."
            );

            return;

        }


        const data =
            JSON.stringify(
                inventaris,
                null,
                2
            );


        const blob =
            new Blob(
                [data],
                {
                    type:
                        "application/json"
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const a =
            document.createElement(
                "a"
            );


        a.href = url;

        a.download =
            "inventaris-ruangan.json";

        a.click();


        URL.revokeObjectURL(
            url
        );


        alert(
            "Data berhasil diexport."
        );

    }
);


// ========================================
// IMPORT DATA
// ========================================

const importFile =
    document.getElementById(
        "importFile"
    );


document.getElementById(
    "importBtn"
).addEventListener(
    "click",
    function () {

        importFile.click();

    }
);


importFile.addEventListener(
    "change",
    function () {

        const file =
            this.files[0];


        if (!file) {
            return;
        }


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                try {

                    const data =
                        JSON.parse(
                            event.target.result
                        );


                    if (
                        !Array.isArray(data)
                    ) {

                        throw new Error();

                    }


                    inventaris = data;

                    saveData();

                    updateDashboard();

                    updateRoomFilter();

                    applyFilters();


                    alert(
                        "Data berhasil diimport."
                    );


                } catch (error) {

                    alert(
                        "File JSON tidak valid."
                    );

                }

            };


        reader.readAsText(
            file
        );


        this.value = "";

    }
);


// ========================================
// BACKUP LOCAL STORAGE
// ========================================

document.getElementById(
    "backupBtn"
).addEventListener(
    "click",
    function () {

        const backup = {

            namaAplikasi:
                "Inventaris Ruangan",

            tanggal:
                new Date().toISOString(),

            data:
                inventaris

        };


        const json =
            JSON.stringify(
                backup,
                null,
                2
            );


        const blob =
            new Blob(
                [json],
                {
                    type:
                        "application/json"
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const a =
            document.createElement(
                "a"
            );


        a.href = url;

        a.download =
            "backup-inventaris.json";

        a.click();


        URL.revokeObjectURL(
            url
        );


        alert(
            "Backup LocalStorage berhasil dibuat."
        );

    }
);


// ========================================
// RESTORE LOCAL STORAGE
// ========================================

const restoreFile =
    document.getElementById(
        "restoreFile"
    );


document.getElementById(
    "restoreBtn"
).addEventListener(
    "click",
    function () {

        restoreFile.click();

    }
);


restoreFile.addEventListener(
    "change",
    function () {

        const file =
            this.files[0];


        if (!file) {
            return;
        }


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                try {

                    const backup =
                        JSON.parse(
                            event.target.result
                        );


                    let data;


                    if (
                        Array.isArray(
                            backup
                        )
                    ) {

                        data = backup;

                    } else if (
                        Array.isArray(
                            backup.data
                        )
                    ) {

                        data =
                            backup.data;

                    } else {

                        throw new Error();

                    }


                    const yakin =
                        confirm(
                            "Restore akan mengganti data inventaris saat ini. Lanjutkan?"
                        );


                    if (!yakin) {
                        return;
                    }


                    inventaris =
                        data;


                    saveData();

                    updateDashboard();

                    updateRoomFilter();

                    applyFilters();


                    alert(
                        "Data berhasil direstore."
                    );


                } catch (error) {

                    alert(
                        "File backup tidak valid."
                    );

                }

            };


        reader.readAsText(
            file
        );


        this.value = "";

    }
);


// ========================================
// ESCAPE HTML
// ========================================

function escapeHTML(text) {

    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// ========================================
// INITIAL LOAD
// ========================================

updateRoomFilter();

updateDashboard();

displayInventaris();
