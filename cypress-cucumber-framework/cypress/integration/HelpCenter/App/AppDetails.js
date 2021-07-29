
class faqs{
    constructor(_faqTitle, _faqBody, _lang){
        this.faqTitle = _faqTitle;
        this.faqBody = _faqBody;
        this.lang = _lang;
    }
}


class section{
    constructor(_id, _faqs, _enName, _sectionDetails){
        this.sectionName = _enName;
        this.faqs = _faqs;
        this.id = _id;
        this.sectionDetails = _sectionDetails
    }
}

class AppDetails{
  
    constructor( _appName,  _sections){
        this.appName = _appName;
        this.sections = _sections;
    }

}