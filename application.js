var calculateSubTotal = function (ele) {
    var quantityItem = Number(`${$(ele).find(".quantity input").val()}`);
    var priceItem = Number(
        `${$(ele).children(".price").text()}`.replace(/[^0-9.-]+/g, "")
    );

    var subTotal = quantityItem * priceItem;
    if (subTotal >= 0) {
        $(ele)
            .children(".subtotal")
            .html(`$${parseFloat(Math.round(subTotal * 100) / 100).toFixed(2)}`);
    }

    return subTotal;
};

var sum = function (acc, x) {
    return acc + x;
};

var updateTotalCart = function () {
    var allSubTotals = [];

    $("tbody tr").each(function (i, ele) {
        var subTotal = calculateSubTotal(ele);
        allSubTotals.push(subTotal || 0);
    });

    if (allSubTotals.length == 0) {
        $("#totalCart").html(`$--.--`);
    } else {
        var totalCart = allSubTotals.reduce(sum);
        $("#totalCart").html(
            `$${parseFloat(Math.round(totalCart * 100) / 100).toFixed(2)}`
        );
    }
};

$(document).ready(function () {
    updateTotalCart();
    $("body").on("click", ".remove", function (event) {
        $(this).closest("tr").remove();
        updateTotalCart();
    });

    var timeout;
    $("body").on("input", "tr input", function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            updateTotalCart();
        }, 500);
    });

    $("#addItem").on("submit", function (event) {
        event.preventDefault();
        var item = $(this).children(".item").val();
        var price = $(this).children(".price").val();

        $("tbody").append(`<tr> 
    <td class="item">${item}</td>
    <td class="price">$${price}</td>
    <td class="quantity">
      <input type="number" min="0" value="1"/>
      <button class="btn mb-1 remove">Remove Item</button>
    </td>
    <td class="subtotal"></td>
    </tr>
    `);
        updateTotalCart();
        $(this).children(".item").val("");
        $(this).children(".price").val("");
    });
});
