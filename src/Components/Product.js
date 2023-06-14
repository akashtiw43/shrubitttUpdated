import React from 'react'
import { Link } from 'react-router-dom';

import StarIcon from '@mui/icons-material/Star';
export default function Product(props) {
    // let badgeText="SOLD OUT"
    // var code=require(`../Images/${props.item.coverImg}`)
    return (
        <div className="product">
            <Link to={`/products/${props.item.producttype}/${props.item.id}`}>
            {/* {!(props.item.stock) && <div className="product--badge">{badgeText}</div>} */}
            <img src={props.item.productimage1} className="product--image" />
            <p className="product--title">{props.item.producttitle}</p>
            <p className="product--price"><span className="bold">Rs.{props.item.price}</span></p>
            {/* <p className='product-desc'>{props.item.description}</p> */}
            {/* <p>Customer Support: {props.item.customersupport}</p> */}
            {/* <div className="product--stats">
                <StarIcon className="product--star" />
                <span>{props.item.stats.rating}</span>
                <span className="gray">({props.item.stats.reviewCount})</span>
                
            </div> */}
            
                <button className='more'>Show More</button>
            </Link>
        </div>
    )
}
// export default function Product(props){
//     return(
//         <div>
          
//             {props.item.producttitle}
//         </div>
//     )
// }
