import {useState} from "react"
import languages from "./../languages.js";
function Translate() {
    const[fromText, setFromText] = useState('');
    const[toText, setToText] = useState('');
    const[fromLanguage, setFromLanguage] = useState('en-GB');
    const[toLanguage, setToLanguage] = useState('hi-IN');
    const [loading, setLoading] = useState(false);
    
    const handleExchange = () =>{
        let tempvalue = fromText;
        setFromText(toText);
        setToText(tempvalue);

        let templang = fromLanguage;
        setFromLanguage(toLanguage);
        setToLanguage(templang);
    }

    const copyContent =(text)=>{
        navigator.clipboard.writeText(text);
    }

    const utterText =(text, language) =>{
          const synth = window.speechSynthesis;
          const utterance = new SpeechSynthesisUtterance(text); 
          utterance.lang = language;
          synth.speak(utterance);
     }

    const handleCopy = (target,id)=>{
          if(target.classList.contains('fa-copy')){
            if(id === 'from'){
                copyContent(fromText);
            }
            else{
                copyContent(toText);
            }
          }
          else{
            if(id=== 'from'){
                utterText(fromText, fromLanguage);
            }
            else{
                utterText(toText ,toLanguage);
            }
          }
    }

    const handleTranslate = ()=>{
        setLoading(true);
        let url = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;
        fetch(url).then((res)=>res.json())
        .then((data) =>{
            setToText(data.responseData.translatedText);
            setLoading(false);
        })

    }



  return (
         <>
         <div className="wrapper">
            <div className="text-input">
                <textarea className="from-text" name="from" placeholder="enter text" id="from" value={fromText} onChange={(event) =>setFromText(event.target.value)} ></textarea>

                <textarea className="to-text" name="to" placeholder="Translated Text" id="to" readOnly value={toText}  ></textarea>

            </div>
            <ul className="controls">
                <li className="row from">
                    <div className="icons">
                    <i className="fa-solid fa-volume-high"  onClick={(event) => handleCopy(event.target, 'from')}></i>
                    <i className="fa-solid fa-copy" onClick={(event) => handleCopy(event.target, 'from')}></i>
                    </div>
                    <select value={fromLanguage} onChange={(event)=>setFromLanguage(event.target.value)}>
                        {
                            Object.entries(languages).map(([code, name]) =>(
                                <option key={code} value={code} >{name}</option>
                            ))
                        }
                </select>
                </li>

                <li className="exchange" onClick={handleExchange}>
                <i className="fa-solid fa-arrow-right-arrow-left"></i>
                </li>

                <li className="row to">
                <select value={toLanguage} onChange={(event)=>setToLanguage(event.target.value)}>
                        {
                            Object.entries(languages).map(([code, name]) =>(
                                <option key={code} value={code} >{name}</option>
                            ))
                        }
                </select>
                <div className="icons">
                    <i className="fa-solid fa-volume-high"  onClick={(event) => handleCopy(event.target, 'to')}></i>
                    <i className="fa-solid fa-copy" onClick={(event) => handleCopy(event.target, 'to')}></i>
                </div>
                </li>
            </ul>
         </div>

         <button onClick={handleTranslate}>
            {loading ? 'Translating...' : 'Translate Text'}
         </button>
         
         </>

  )
}

export default Translate
