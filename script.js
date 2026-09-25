const dataBuku = {

    "Kelas 7": [
        {
            judul: "Matematika Kelas 7",
            mapel: "Matematika",
            file: "Buku/matematika-kelas-7.pdf",
            cover: "Cover/matematika-kelas-7.jpg"
        },
        {
            judul: "Ilmu Pengetahuan Alam Kelas 7",
            mapel: "IPA",
            file: "Buku/ipa-kelas-7.pdf",
            cover: "Cover/ipa-kelas-7.jpeg"
        },
        {
            judul: "Ilmu Pengetahuan Sosial Kelas 7",
            mapel: "IPS",
            file: "Buku/ips-kelas-7.pdf",
            cover: "Cover/ips-kelas-7.png"
        }
    ],

    "Kelas 8": [
        {
            judul: "Matematika Kelas 8",
            mapel: "Matematika",
            file: "Buku/matematika-kelas-8.pdf",
            cover: "Cover/matematika-kelas-8.jpeg"
        },
        {
            judul: "Ilmu Pengetahuan Alam Kelas 8",
            mapel: "IPA",
            file: "Buku/ipa-kelas-8.pdf",
            cover: "Cover/ipa-kelas-8.jpeg"
        }
    ],

    "Kelas 9": [
        {
            judul: "Matematika Kelas 9",
            mapel: "Matematika",
            file: "Buku/matematika-kelas-9.pdf",
            cover: "Cover/matemtika-kelas-9.png"
        },
        {
            judul: "Ilmu Pengetahuan Alam Kelas 9",
            mapel: "IPA",
            file: "Buku/ipa-kelas-9.pdf",
            cover: "Cover/ipa-kelas-9.png"
        }
    ]

};


// =========================
// CEK HALAMAN
// =========================

const halamanUtama =
    document.getElementById("hasilBuku");

const halamanDetail =
    document.getElementById("detailJudul");


// =========================
// HALAMAN UTAMA
// =========================

if (halamanUtama) {

    const tombol =
        document.querySelectorAll(".kelas button");

    const filterMapel =
        document.getElementById("filterMapel");

    const hasilBuku =
        document.getElementById("hasilBuku");

    const searchInput =
        document.getElementById("searchInput");

    const clearSearch =
        document.getElementById("clearSearch");


    let tombolFilter = [];

    let kelasAktif = null;

    let mapelAktif = "Semua";


    // =========================
    // BUAT FILTER MAPEL
    // =========================

    function buatFilterMapel() {

        filterMapel.innerHTML = "";

        if (!kelasAktif) {
            return;
        }

        const semuaMapel = new Set();

        for (const buku of dataBuku[kelasAktif]) {
            semuaMapel.add(buku.mapel);
        }


        const tombolSemua =
            document.createElement("button");

        tombolSemua.textContent = "Semua";
        tombolSemua.dataset.mapel = "Semua";
        tombolSemua.classList.add("filter-aktif");

        filterMapel.appendChild(tombolSemua);


        for (const mapel of semuaMapel) {

            const tombol =
                document.createElement("button");

            tombol.textContent = mapel;
            tombol.dataset.mapel = mapel;

            filterMapel.appendChild(tombol);
        }


        tombolFilter =
            document.querySelectorAll(
                "#filterMapel button"
            );


        for (const filter of tombolFilter) {

            filter.onclick = function() {

                mapelAktif =
                    filter.dataset.mapel;


                for (
                    const tombol
                    of tombolFilter
                ) {

                    tombol.classList.remove(
                        "filter-aktif"
                    );

                }


                filter.classList.add(
                    "filter-aktif"
                );


                tampilkanBuku();

            };

        }

    }


    // =========================
    // PILIH KELAS
    // =========================

    for (const btn of tombol) {

        btn.onclick = function() {

            kelasAktif =
                btn.textContent;


            for (
                const tombolKelas
                of tombol
            ) {

                tombolKelas.classList.remove(
                    "kelas-aktif"
                );

            }


            btn.classList.add(
                "kelas-aktif"
            );


            searchInput.value = "";

            mapelAktif = "Semua";


            buatFilterMapel();

            tampilkanBuku();


            document
                .getElementById("searchBox")
                .scrollIntoView({
                    behavior: "smooth"
                });

        };

    }


    // =========================
    // TAMPILKAN BUKU
    // =========================

    function tampilkanBuku() {

        if (!kelasAktif) {
            return;
        }


        const kataKunci =
            searchInput.value
                .toLowerCase()
                .trim();


        const semuaBuku =
            dataBuku[kelasAktif];


        const bukuDitemukan =
            semuaBuku.filter(buku => {

                const cocokMapel =
                    mapelAktif === "Semua" ||
                    buku.mapel === mapelAktif;


                const cocokSearch =
                    buku.judul
                        .toLowerCase()
                        .includes(kataKunci)
                    ||
                    buku.mapel
                        .toLowerCase()
                        .includes(kataKunci);


                return cocokMapel &&
                       cocokSearch;

            });


        hasilBuku.innerHTML =
            `<h2>${kelasAktif}</h2>`;


        if (bukuDitemukan.length === 0) {

            hasilBuku.innerHTML += `

                <div class="tidak-ditemukan">

                    <div>📭</div>

                    <p>
                        Buku tidak ditemukan.
                    </p>

                </div>

            `;

            return;
        }


        for (const buku of bukuDitemukan) {

            const tombolBaca =
                buku.file
                ?
                `<button
                    onclick="bukaDetail('${buku.file}')"
                >
                    📖 Lihat Detail
                </button>`
                :
                `<button disabled>
                    Belum tersedia
                </button>`;


            hasilBuku.innerHTML += `

                <div class="buku">

                    <div class="cover-buku">

                        ${
                            buku.cover
                            ?
                            `<img
                                src="${buku.cover}"
                                alt="${buku.judul}"
                            >`
                            :
                            `<div class="icon-buku">
                                📚
                            </div>`
                        }

                    </div>


                    <div class="info-buku">

                        <h3>
                            ${buku.judul}
                        </h3>

                        <p>
                            ${buku.mapel}
                        </p>

                    </div>


                    ${tombolBaca}

                </div>

            `;

        }

    }


    // =========================
    // SEARCH
    // =========================

    searchInput.addEventListener(
        "input",
        tampilkanBuku
    );


    // =========================
    // CLEAR SEARCH
    // =========================

    clearSearch.addEventListener(
        "click",
        function() {

            searchInput.value = "";

            tampilkanBuku();

            searchInput.focus();

        }
    );

}


// =========================
// BUKA DETAIL BUKU
// =========================

function bukaDetail(file) {

    window.location.href =
        "detail.html?file=" +
        encodeURIComponent(file);

}


// =========================
// HALAMAN DETAIL
// =========================

if (halamanDetail) {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const file =
        params.get("file");


    let bukuDitemukan = null;
    let kelasBuku = null;


    // Cari buku berdasarkan file PDF

    for (const kelas in dataBuku) {

        for (const buku of dataBuku[kelas]) {

            if (buku.file === file) {

                bukuDitemukan = buku;
                kelasBuku = kelas;

            }

        }

    }


    const cover =
        document.getElementById("detailCover");

    const judul =
        document.getElementById("detailJudul");

    const mapel =
        document.getElementById("detailMapel");

    const kelas =
        document.getElementById("detailKelas");

    const tombolBaca =
        document.getElementById("tombolBaca");


    if (bukuDitemukan) {

        cover.src =
            bukuDitemukan.cover;

        cover.alt =
            bukuDitemukan.judul;


        judul.textContent =
            bukuDitemukan.judul;


        mapel.textContent =
            bukuDitemukan.mapel;


        kelas.textContent =
            kelasBuku;


        tombolBaca.onclick =
            function() {

                bacaBuku(bukuDitemukan.file);

            };

    } else {

        judul.textContent =
            "Buku tidak ditemukan";

        mapel.textContent =
            "";

        kelas.textContent =
            "";

        cover.style.display =
            "none";

        tombolBaca.style.display =
            "none";

    }

}


// =========================
// BACA BUKU
// =========================

function bacaBuku(file) {

    window.location.href =
        "reader.html?file=" +
        encodeURIComponent(file);

}