function ReportSending() {

    var ss = SpreadsheetApp.openById('1OQTjFtPaJsl849De9PJLPteRM3OpTP5PlAoQ8VOCCAo');
    var ws = ss.getSheetByName('Doer list');
    var db = ss.getSheetByName('Automate mailer System');
    var Data = ws.getRange(2,1,ws.getLastRow(),1).getValues();
  
  
      for (var i=0;i<Data.length;i++) {
         
        var Avals  = db.getRange("A5:A").getValues();
        var Alast = Avals.filter(String).length;
        var Email = Data[i][0];
        db.getRange("B2").setValue(Email);  
        var DashboardData = db.getRange(4,1,db.getLastRow(),9).getValues();
        
  
        if( Alast > 1  ){
        
  
          var Subject = "Summary of all leads FMS | " +  Email
          var Body = HtmlService.createTemplateFromFile("individual.html").evaluate().getContent()
                                    .replace("{Email}",Email);
  
  
          var file = DriveApp.getFileById('1uaaaSaVmsRkA4A2I6z_-ujXBGqsEJFwvjzyygWH6l1M');
          var folder = DriveApp.getFolderById('1Tngzr-1ADxpfg8SfKzgi-oNWA8fSpJjr')
          var Pdffolder = DriveApp.getFolderById('1brG0-NBRjxu2wGVGr-QZ0TFmbvyAEztr')
          var tempFile = file.makeCopy(folder);
          var tempDocFile =  DocumentApp.openById(tempFile.getId());
          tempDocFile.getBody().appendTable(DashboardData)
          tempDocFile.saveAndClose();
          var PdfContentBlob = tempFile.getAs(MimeType.PDF)
          var Attachments =  Pdffolder.createFile(PdfContentBlob).setName("Lead Assiged | "+Email+".pdf")
          folder.removeFile(tempFile)
          MailApp.sendEmail([Email,'dme@twigafiber.com'],Subject,Body,{htmlBody: Body,attachments:Attachments});
          Pdffolder.removeFile(Attachments)
            
          
                                      
  
  
        
  
      
        }
  
  
    
    }
  
  
  
    
  };
  
  
  
  
  