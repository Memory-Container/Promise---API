const firstTest = [1, 2, 3, 4, 5, 6, "Lê Văn A", "Nguyễn Thị B", "Đỗ Thị C"]
const secondTest = [10, 20, 30, 40, 50, 60]
const thirdTest = [1, 2, 4, 6, 8, 10, 3, 5, 7, 9]
function throwError(message) {
    throw new Error(message)
}
function consoleLog(element) {
    console.log(element)
}
function consoleLog2(element1, element2) {
    console.log(element1 + element2)
}
function forEachTest(array, callback) {
    for (element of array) {
        callback(element)
    }
}

function forEachPair(array, callback) {
    for (let i = 0; i < array.length - 1; i++) {
        callback(array[i], array[i + 1])
    }
}
const random = new Promise((resolve, reject) => {
    let randomInt = Math.floor(Math.random() * 10)
    if (randomInt == undefined) {
        reject("Lỗi: Không thể tạo số ngẫu nhiên.")
    } else {
        resolve(`Số ngẫu nhiên: ${randomInt}`)
    }
})
const filterEven = new Promise((resolve, reject) => {
    let evenArray = thirdTest.filter(x => x % 2 == 0)
    if (evenArray.length > 0) {
        resolve(evenArray)
    } else {
        reject("Lỗi: Không tìm thấy số chẵn.")
    }
})
random.then((result) => {
        consoleLog(result)
    }).catch((e) => {
        throwError(e)
    })
filterEven.then((result) => {
    consoleLog(result)
    }).catch((e) => {
        throwError(e)
    })
forEachTest(firstTest, consoleLog)
forEachPair(secondTest, consoleLog2)

async function flagData() {
    try {
        const API = await fetch('https://open.oapi.vn/location/countries')
        if (!API.ok) {
        throw new Error(`HTTP error! status: ${API.status}`);
        }
        const { data } = await API.json();
        consoleLog(data)
        createFlagDisplay(data)
    }
    catch (error) {
        console.error(error);
    }
}
function createFlagDisplay(data) {
    const container = document.querySelector(".container")
    let string = ""
    for (element of data) {
        string += 
        `
        <div class="flagContainer">
            <img src="${element.flag}" loading="lazy" alt="Country Flag">
            ${ element.name }
        </div>
        `
    }
    container.innerHTML = string
}
flagData()

async function getIP() {
    try {
        const API = await fetch("https://api.ipify.org/?format=json")
        if (API == "") { throw new Error("No response from API endpoint")}
        const { ip } = await API.json()
        const IPC = document.querySelector(".IP")
        IPC.textContent = `Your IP is ${ ip }`
    }
    catch (e) {
        console.error(error);
    }
}
getIP()