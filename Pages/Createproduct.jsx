import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Createproduct = () => {
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [img5, setImg5] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [seller, setSeller] = useState("");
  const [stock,setStock]=useState()
  const [tagname, setTagname]= useState('')
  const [loading,setLoading] =useState(false)

  const [sellerList, setSellerList] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  //   ===================================================getting seller details======================================================
  const fetchSeller = async () => {
    await axios
      .get("http://localhost:4000/api/user/fetch_seller")
      .then((res) => {
        console.log("sellers", res.data.result);
        setSellerList(res.data.result);
        console.log(sellerList);
      })
      .catch(err=>{
        console.log(err)
      })
  };

  useEffect(() => {
    fetchSeller();
  }, []);

  // ===================================================function that uploads files=================================================
  const uploadFile = async (file) => {
    const payload = new FormData();
    payload.append("file", file);
    payload.append("upload_preset", "images_preset");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/ddycjnke1/image/upload",
      payload
    );
    const { secure_url } = response.data;

    return secure_url;
  };

  //   ==================================================handle submit to cloudinary and backend====================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      let image1, image2, image3, image4, image5;
      if (img1 && img2 && img3 && img4 && img5) {
        image1 = await uploadFile(img1);

        image2 = await uploadFile(img2);

        image3 = await uploadFile(img3);

        image4 = await uploadFile(img4);

        image5 = await uploadFile(img5);
      }

      const payload = {
        image1: image1,
        image2: image2,
        image3: image3,
        image4: image4,
        image5: image5,
        title: title,
        price: price,
        about: about,
        category: category,
        seller: seller,
        stock:stock,
        tagname:tagname
      };
      console.log(payload);

      await axios
        .post("http://localhost:4000/api/products/create_product", payload)
        .then((res) => {
          console.log(res);
          setLoading(false)
          location.reload()
        })
        .catch((err) => {
          console.log(err);
          setLoading(false)
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container cpContainer">
      <div className="content">
        <h1 className="formTitle">Create Product</h1>
        <form onSubmit={handleSubmit} className="form createProduct">
        <div className="inputs">
        <div className="formHalf2">{/* =============input title========== */}
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {/* =============input price========== */}
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        {/* =============input category========== */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select an option...</option>
          <option value="Electronics">Electronics</option>
          <option value="Home Decor">Home Decor</option>
          <option value="Life Style">Life Style</option>
        </select>
        {/* =============input feature========== */}
        <textarea
          name="about"
          placeholder="About product"
          cols={30}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
        />

        {/* ===============select Seller================= */}

        <select
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
          required
        >
          <option value="">Select an option...</option>
          {sellerList.map((ele, index) => {
            return (
              <option key={index} value={ele.username}>
                {ele.username}
              </option>
            );
          })}
        </select>

        {/* =============input stock========== */}
        <input
          type="number"
          placeholder="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        /></div>
        <div className="formHalf1">
          <input
          type="file"
          accept="image/*"
          name="image"
          placeholder="image upload"
          onChange={(e) => setImg1(e.target.files[0])}
          required
        />
        <input
          type="file"
          accept="image/*"
          name="image"
          placeholder="image upload"
          onChange={(e) => setImg2(e.target.files[0])}
          required
        />
        <input
          type="file"
          accept="image/*"
          name="image"
          placeholder="image upload"
          onChange={(e) => setImg3(e.target.files[0])}
          required
        />
        <input
          type="file"
          accept="image/*"
          name="image"
          placeholder="image upload"
          onChange={(e) => setImg4(e.target.files[0])}
          required
        />
        <input
          type="file"
          accept="image/*"
          name="image"
          placeholder="image upload"
          onChange={(e) => setImg5(e.target.files[0])}
          required
        />
        <input
          type="text"
          placeholder="Tag name"
          value={tagname}
          onChange={(e) => setTagname(e.target.value)}
          required
        />
          </div>
         
        </div>
          
        
        

        <button type="submit" disabled={loading}>{loading?"Loading...":"Create Product"}</button>
      </form>
      </div>
      
      
    </div>
  );
};

export default Createproduct;
