import { useContext, useState } from "react";
import AddRoomForm from "../../Forms/AddRoomForm";
import { imageUpload } from "../../../api/utils";
import { AuthContext } from "../../../providers/AuthProvider";
import { addRoom } from "../../../api/rooms";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  //handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const location = event.target.location.value;
    const title = event.target.title.value;
    const from = dates.startDate;
    const to = dates.endDate;
    const price = event.target.price.value;
    const guests = event.target.total_guest.value;
    const bedrooms = event.target.bedrooms.value;
    const bathrooms = event.target.bathrooms.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const image = event.target.image.files[0];

    setUploadButtonText('Uploading...')

    //Update image
    imageUpload(image)
      .then((data) => {
        const roomData = {
          location,
          title,
          from,
          to,
          price: parseFloat(price),
          guests,
          bedrooms,
          bathrooms,
          description,
          image: data.data.display_url,
          host: {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
          },
          category,
        }

        //post room data in server
        addRoom(roomData)
        .then(data => {
          console.log(data)
          setUploadButtonText('Uploaded!')
          setLoading(false)
          toast.success('Room Added!')
          navigate('/dashboard/my-listings')
        })
        .catch((error) =>console.log(error))

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const handleImageChange = (image) => {
    setUploadButtonText(image.name);
  };

  const handleDates = ranges => {
    setDates(ranges.selection)
  }

  return (
    <AddRoomForm
      handleSubmit={handleSubmit}
      loading={loading}
      uploadButtonText={uploadButtonText}
      handleImageChange={handleImageChange}
      dates={dates}
      handleDates={handleDates}
    />
  );
};

export default AddRoom;
