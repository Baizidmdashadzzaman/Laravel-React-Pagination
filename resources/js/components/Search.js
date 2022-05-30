import React ,{ useRef ,useState ,useEffect} from 'react';
import { useParams ,NavLink } from 'react-router-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";
function Search() {

  const [allProduct, setAllProduct] = useState([]);
  const [allProductAll, setAllProductAll] = useState([]);
  

  const fetchData = async (pageNumber = 1) => {
    axios
    .get(`/api/product?page=${pageNumber}`)
    .then((response) => {
      setAllProduct(response.data.allData)
      setAllProductAll(response.data.allData.data)
    })
    .catch((error) => {
      console.error(error);
    });

    // const api = await fetch(`/product?page=${pageNumber}`);
    // setAllProduct( await api.json() );

  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
    <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-header"><b>Product page</b></div>
                <div className="card-body">
                    <p>This is product component .</p>
                </div>
            </div>

<section style={{backgroundColor: '#eee'}}>
  <div className="container py-5">
    <div className="row">
    {
       allProductAll.length > 0 ? (
        allProductAll.map((singledata) => (
      <div className="col-md-12 col-lg-4 mb-4 mb-lg-0" style={{paddingBottom:'5px'}}>
        <div className="card text-black">
          <img src={"/"+singledata.product_image} 
          className="card-img-top" alt="iPhone" />
          <div className="card-body">
            <div className="text-center mt-1">
              <h4 className="card-title">{singledata.product_name}</h4>
              <h6 className="text-primary mb-1 pb-3">Product price : ৳ {singledata.product_price}</h6>
            </div>
            
            <div className="d-flex flex-row">
              <button type="button" className="btn btn-primary btn-block flex-fill me-1" data-mdb-ripple-color="dark">
                View product
              </button>
              
            </div>
          </div>
        </div>
      </div>
  ))
  ) : (
      <h6 className="text-danger text-center">No Data Found </h6>
  )
}

    </div>
    <Pagination
                                    activePage={allProduct?.current_page ? allProduct?.current_page : 0}
                                    itemsCountPerPage={allProduct?.per_page ? allProduct?.per_page : 0 }
                                    totalItemsCount={allProduct?.total ? allProduct?.total : 0}
                                    onChange={(pageNumber) => {
                                        fetchData(pageNumber)
                                    }}
                                    pageRangeDisplayed={8}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    firstPageText="First Page"
                                    lastPageText="Last Lage"
                                />
  </div>
</section>




        </div>
    </div>
    <br/><br/><br/><br/>
    </div>
  )
}

export default Search