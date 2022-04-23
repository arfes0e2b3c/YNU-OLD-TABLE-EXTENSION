unclickable();
function unclickable() {
  let csbList = document.getElementsByClassName("csbList")[0];
  csbList.classList.remove("clickable");
  let csbStr = document.getElementsByClassName("csbStr")[0];
  csbStr.classList.remove("clickable");
}

moveNewsArea();
function moveNewsArea() {
  let newsArea = document.getElementsByClassName("newsArea")[0];
  let form = document.getElementById("homehomlInfo");
  form.appendChild(newsArea);
  let newsSubO = newsArea.getElementsByClassName("newsSubO");
  // for(let news of newsSubO){
  //   news.innerText = news.innerText.substr(13);
  // }
}


changeToOldLmsTable();
function changeToOldLmsTable() {
  const tableInfo = getClassData();
  createTable(tableInfo);
  removeOrigin();
}

function getClassData() {
  let tableInfo = []
  const dayOfWeekTags = document.getElementsByClassName("cpLabel");
  for(dayOfWeekTag of dayOfWeekTags) {
    let tableRow = {};
    if(dayOfWeekTag.innerText) {
      tableRow.dayOfWeek = dayOfWeekTag.innerText;
      tableInfo.push(tableRow);
    }
  }
  const dayOfWeekClasses = document.getElementsByClassName("courseCardArea");
  for(i=0;i < dayOfWeekClasses.length;i++) {
    const periods = dayOfWeekClasses[i].getElementsByClassName("courseCardInfo");
    tableInfo[i].periods = periods
    const classes = dayOfWeekClasses[i].getElementsByClassName("courseCardName");
    tableInfo[i].classes = classes;
    let teacherNameTags = dayOfWeekClasses[i].getElementsByClassName("courseCardUser");
    console.log(teacherNameTags);
    let teacherNames = [];
    for(j=0;j < teacherNameTags.length;j++) {
      teacherNames.push(teacherNameTags[j].innerText.split("[")[0]);
    }
    tableInfo[i].teacherNames = teacherNames;
  }
  tableInfo[0].classes[0].classList.add("changedClass");
  return tableInfo;
} 

function createTable(tableInfo) {
  let classTable = document.createElement("table");
  classTable.classList.add("classTable");
  classTable.setAttribute("cellspacing",0);
  for(const dayOfWeekInfo of tableInfo) {
    for(let i = 0;i < dayOfWeekInfo.classes.length;i++) {
      let tr = document.createElement("tr");
      if(i === 0) {
        let th = document.createElement("th");
        th.innerText = dayOfWeekInfo.dayOfWeek;
        th.setAttribute("rowspan",dayOfWeekInfo.classes.length);
        th.innerText = dayOfWeekInfo.dayOfWeek;
        tr.appendChild(th);
      }
      let periodTd = document.createElement("td");
      periodTd.classList.add("periodTd");
      periodTd.innerText = dayOfWeekInfo.periods[i].innerText.split("春" || "秋")[0];
      tr.appendChild(periodTd);

      let classNameTd = document.createElement("td");
      classNameTd.classList.add("classNameTd");
      classNameTd.innerText = omit(dayOfWeekInfo.classes[i].innerText);
      tr.appendChild(classNameTd);
      
      tr.appendChild(dayOfWeekInfo.classes[i].childNodes[1]);

      let teacherNameTd = document.createElement("td");
      teacherNameTd.innerText = dayOfWeekInfo.teacherNames[i];
      tr.appendChild(teacherNameTd);
      
      
      
      classTable.appendChild(tr);
    }
  }
  let searchBox = document.getElementsByClassName("courseSearchArea");
  console.log(classTable);
  searchBox[0].after(classTable);
}
function omit(className) {
  if (className.includes("[")) {
    className = className.split("[")[0];
  }
  else if (className.includes("(")) {
    className = className.split("(")[0];
  }
  if (className.includes("【連絡専用】")) {
    className = className.split("【連絡専用】")[1];
  }
  if (className.includes("実施済み")) {
    className = "実施";
  }
  return className
}
function removeOrigin() {
  let home = document.getElementsByClassName("weeklyCourseArea")[0];
  home.remove();
}