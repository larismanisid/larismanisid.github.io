const cashPaymentButton = document.getElementById("cashPayment");
const qrisPaymentButton = document.getElementById("qrisPayment");
const transferPaymentButton = document.getElementById("transferPayment");
const customerNameInput = document.getElementById("customerName");
const customerPhoneInput = document.getElementById("customerPhone");
const deliveryTimeInput = document.getElementById("deliveryTime");
const customerAddressInput = document.getElementById("customerAddress");

function validatePhoneNumber(phone) {
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;

    return phoneRegex.test(phone);
}

function getPaymentMethod() {
    if (cashPaymentButton.checked) {
        return "Cash";
    } else if (qrisPaymentButton.checked) {
        return "QRIS";
    }

    return "Transfer";
}

function placeOrder() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        alert("Belum ada pesanan yang dibuat.");
        
        return;
    }

    if (!customerNameInput.value || !customerPhoneInput.value || !deliveryTimeInput.value || !customerAddressInput.value) {
        alert("Mohon lengkapi semua informasi pelanggan.");

        return;
    }

    let paymentMethod = getPaymentMethod();
    let customerName = customerNameInput.value;
    let customerPhone = customerPhoneInput.value.replace(/[\s-]/g, "");

    if (customerPhone.startsWith("+620")) customerPhone = "+62" + customerPhone.slice(4);
    if (customerPhone.startsWith("620")) customerPhone = "62" + customerPhone.slice(3);

    let deliveryTime = deliveryTimeInput.value.replace("T", " ");
    let customerAddress = customerAddressInput.value;

    if (!validatePhoneNumber(customerPhone)) {
        alert("Nomor telepon tidak valid. Pastikan nomor diawali dengan +62, 62, atau 0 dan diikuti oleh angka yang benar.");

        return;
    }

    let ordersString = "";
    let totalPrice = 0;

    orders.forEach((order, index) => {
        let price = order.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
        let total = order.total.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

        totalPrice += order.total;
        ordersString += `*${order.name}* (${price}) x ${order.quantity} = ${total}\n`;
    });

    totalPrice = totalPrice.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

    const message = `Halo Laris Manis!\n`
        + `Nama saya *${customerName}* dan saya ingin memesan:\n\n${ordersString}\nDengan total: *${totalPrice}*`
        + `\nYang akan dibayar menggunakan: *${paymentMethod}*`
        + `\nLalu diantar ke: *${customerAddress}*`
        + `\nPada: *${deliveryTime}*`
        + `\nJika ada pertanyaan, anda bisa menghubungkan saya menggunakan nomor telepon: *${customerPhone}*`
        + `\n\nBisakah anda menerima pesanan saya? Terima kasih!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285719122564?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
}