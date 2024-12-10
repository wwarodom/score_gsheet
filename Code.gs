function doGet() {
  return HtmlService.createTemplateFromFile('index')
  .evaluate()
  .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
} 

function sub(v){
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Score");
  let isFoundStudentId = 0;
   
  let rowFirst = '<tr><th colspan=2></th>';
  for( i=3; i<= sheet.getLastColumn(); i++) { 
    console.log("Data:", i, " : ", sheet.getRange(1,i).getValue() )  // all label from row 1
    rowFirst += "<th class=\"w3-center w3-indigo\">" + sheet.getRange(1,i).getValue() + "</th>"; 
  }
  rowFirst += "</tr>"

  
  let rowHead = '<tr>';
  for( i=1; i<= sheet.getLastColumn(); i++) { 
    console.log("Data:", i, " : ", sheet.getRange(2,i).getValue() )  // all label from row 2
    rowHead += "<th class=\"w3-center w3-light-green\">" + sheet.getRange(2,i).getValue() + "</th>"; 
  }
  rowHead += "</tr>"
  console.log("rowHead", rowHead) 
  console.log("last column(): ",sheet.getLastColumn()) 

  let rowScore = '<tr>';
  for(let row = 3;row <= sheet.getLastRow();row++){   // start row 3 for student data
    if( v.roll == sheet.getRange(row, 1).getValue() ) { // found student ID row
      isFoundStudentId = 1;
      let lastColumn = sheet.getLastColumn();
      for(let column=1; column<= lastColumn; column++) {
        const cell = sheet.getRange(row,column).getValue()
        const item = (column === 1 || column === 2 || column === lastColumn-1 || column === lastColumn )?cell:Number(cell).toFixed(2)
        rowScore += "<td class=\"w3-center\">" + item + "</td>"; 
      } 

      return `
      <div class="w3-responsive">
        <table class="w3-table w3-hover-green w3-bordered">
          <thead>   
            ${rowFirst}
          </thead>   
          <thead>   
            ${rowHead}
          </thead>   
          <tbody>  
            ${rowScore} 
          </tbody>
        </table> 
      </div>
      <br/>
      * any issue, contact: <a href=mailto:warodom.w@phuket.psu.ac.th>warodom.w@psu.ac.th</a>`; 
    }
  }

  if(isFoundStudentId==0) return "Student ID does not exist, please try again..."; 
};
