const renderTableRow = (item) => {
    const rowId = `row-${item.id}`;
    const $tableRow = $(`<tr id="${rowId}"></tr>`);
    const $RowNaziv = $(`<td>${item.naziv}</td>`);
    const $RowCena = $(`<td>${item.cena}</td>`);
    const $RowKolicina = $(`<td></td>`);
    const $RowUkupnaCena = $(`<td>${item.komada * item.cena}</td>`);
    const $RowDugmeMinus = $(`<button><i class="fa-solid fa-minus"></i></button>`);
    const $RowDugmePlus = $(`<button><i class="fa-solid fa-plus"></i></button>`);

    $RowKolicina.append($RowDugmeMinus);
    $RowKolicina.append(`<span>${item.komada}</span>`);
    $RowKolicina.append($RowDugmePlus);

    $tableRow.append($RowNaziv);
    $tableRow.append($RowCena);
    $tableRow.append($RowKolicina);
    $tableRow.append($RowUkupnaCena);

    $RowDugmeMinus.click(() => lowerNumber(item, $RowKolicina));
    $RowDugmePlus.click(() => addNumber(item, $RowKolicina));

    return $tableRow;
}

const lowerNumber = (item, $RowKolicina) => {
    if (item.komada > 0) {
        item.komada--;
        updateRow(item, $RowKolicina);
        updateSum();
    }
    if (item.komada === 0) {
        removeItemFromList(item);
    }
}

const removeItemFromList = (item) => {
    $(`#row-${item.id}`).remove();
}
const addNumber = (item, $RowKolicina) => {
    item.komada++;
    updateRow(item, $RowKolicina);
    updateSum();
}

const updateRow = (item, $RowKolicina) => {
    const rowId = `row-${item.id}`;
    const DisplayID = `quantity-display-${rowId}`;

    $RowKolicina.find('span').text(item.komada);
    $(`#${rowId} td:nth-child(4)`).text(item.komada * item.cena);
}

const updateSum = () => {
    let ukupnaSuma = 0;
    $("#table tbody tr").each(function () {
        const cena = parseInt($(this).find("td:nth-child(4)").text());
        if (!isNaN(cena)) {
            ukupnaSuma += cena;
        }
    });

    $("#ukupna-suma").text(ukupnaSuma);
}

const prikaziTabelu = (lista) => {
    lista.forEach(element => {
        $("#table tbody").append(renderTableRow(element));
    });
    updateSum();
}

const dodajArtikal = () => {
    const naziv = $("#naziv").val();
    const cena = $("#cena").val();
    const kolicina = $("#kolicina").val();

    if (naziv && cena && kolicina) {
        const newItem = { "id": Date.now(), "naziv": naziv, "komada": parseInt(kolicina), "cena": parseInt(cena) };
        
        $("#table tbody").append(renderTableRow(newItem));
        updateSum();
        $("#naziv").val('');$("#cena").val(''); $("#kolicina").val('');
    } else {
        alert("Molimo vas da popunite sva polja.");
    }
}

$(document).ready(function() {
    const data = [ 
        { "id": 1, "naziv" : "Chair", "komada": 1, "cena": 233 }, 
        { "id": 2, "naziv" : "Car", "komada": 3, "cena": 324 }, 
        { "id": 3, "naziv" : "Computer", "komada": 2, "cena": 319 }, 
        { "id": 4, "naziv" : "Chair", "komada": 3, "cena": 405 }, 
        { "id": 5, "naziv" : "Pizza", "komada": 3, "cena": 121 }, 
        { "id": 6, "naziv" : "Chips", "komada": 3, "cena": 58 }, 
        { "id": 7, "naziv" : "Table", "komada": 2, "cena": 324 }, 
        { "id": 8, "naziv" : "Sausages", "komada": 3, "cena": 204 }, 
        { "id": 9, "naziv" : "Pants", "komada": 3, "cena": 335 }, 
        { "id": 10, "naziv" : "Table", "komada": 1, "cena": 350 } 
    ];
    prikaziTabelu(data);
});