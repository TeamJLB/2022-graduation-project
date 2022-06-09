const logo = document.getElementById("logo");
const mainPage = document.getElementById("mainpage");
const sideMenu = document.getElementById("sidemenu");
const addMeetingBtn = document.getElementById("addMeeting");
const meetingList = document.getElementById("meetingList");
const searchbar = meetingList.querySelector("#searchbar");
const meetingTable = document.querySelector("#meetingTable table");
const meetingTbody = meetingList.querySelector("#meetingTbody");
const historyBtns = document.querySelectorAll("#historyBtn");

function clickLogo() {
  location.href = "/";
}

logo.addEventListener("click", clickLogo);

function clickAddMeeting() {
  //   let newRow = document.createElement("tr");
  //   let newCell = document.createElement("td");
  //   const thNum = meetingTable.rows[0].cells.length;
  location.href = "/meetingRoom";
}

addMeetingBtn.addEventListener("click", clickAddMeeting);

function clickMeetingHistory() {
  location.href = "/meetingHistory";
}
historyBtns.forEach((historyBtn) =>
  historyBtn.addEventListener("click", clickMeetingHistory)
);
