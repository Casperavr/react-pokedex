import { Link } from "react-router-dom"

export default function NotFoundPage (){
    return (
        <div className="notfound-container"> 
            <img src="https://i.giphy.com/R15WrVMPBakLK.webp" classname="notfound-gif"/>
            <h1 className="notfound-title">404 ERROR - PAGE NOT FOUND</h1>
            <p className="notfound-msg1">This page isn't available, might be removed, name changed or is temporarily unavailable</p>
            <p className="notfound-msg2">Try searching for something else</p> 
            <Link to="/*" className="notfound-link">Go back to dashboard</Link>
        </div> 
    );
}