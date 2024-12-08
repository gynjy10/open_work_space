// 데이터 정의
const menuData = {
    h1: ["집합과 명제", "수체계", "방정식과 부등식"],
    h2: ["지수와 로그", "지수함수와 로그함수", "수열"],
    hs0: ["미분의 기초", "미적분의 응용"],
    hs1: ["확률", "통계"],
    hs2: ["기하의 기초", "벡터의 응용"]
};

const mainMenu = document.getElementById("mainMenu");
const submenu1 = document.getElementById("submenu1");
const submenu2 = document.getElementById("submenu2");

// 상위 메뉴 변경 이벤트
mainMenu.addEventListener("change", function () {
    const selectedValue = mainMenu.value;
    const selectedText = mainMenu.options[mainMenu.selectedIndex].text; // 선택한 옵션의 텍스트

    if (selectedValue) {
        // 하위 메뉴 1단계 활성화 및 옵션 설정
        submenu1.disabled = false;
        submenu1.innerHTML = `<option value="" selected>${selectedText}의 대단원 선택</option>`;
        menuData[selectedValue].forEach((item, index) => {
            const option = document.createElement("option");
            option.value = index + 1;
            option.textContent = item;
            submenu1.appendChild(option);
        });

        // 하위 메뉴 2단계는 초기화 및 비활성화 상태 유지
        submenu2.disabled = true;
        submenu2.innerHTML = `<option value="" selected>${selectedText}의 소단원 선택</option>`;
    } else {
        // 상위 메뉴 선택 해제 시 모든 하위 메뉴 비활성화
        submenu1.disabled = true;
        submenu2.disabled = true;
        submenu1.innerHTML = `<option value="" selected>대단원 선택</option>`;
        submenu2.innerHTML = `<option value="" selected>소단원 선택</option>`;
    }
});

// 하위 메뉴 1단계 변경 이벤트
submenu1.addEventListener("change", function () {
    const selectedValue = submenu1.value;
    const selectedText = submenu1.options[submenu1.selectedIndex]?.text; // 선택한 대단원의 텍스트

    if (selectedValue) {
        // 하위 메뉴 2단계 활성화 및 기본 옵션 설정
        submenu2.disabled = false;
        submenu2.innerHTML = `<option value="" selected>${selectedText}의 소단원 선택</option>`;
    } else {
        // 하위 메뉴 2단계 비활성화
        submenu2.disabled = true;
        submenu2.innerHTML = `<option value="" selected>${mainMenu.options[mainMenu.selectedIndex]?.text || '과정'}의 소단원 선택</option>`;
    }
});
