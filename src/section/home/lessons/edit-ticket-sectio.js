import React, { useEffect, useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import TagsInput from '../../../common/TagsInput'
import 'react-toastify/dist/ReactToastify.css';
const styles = {
    input: {
        opacity: '0%', // dont want to see it
        position: 'absolute' // does not mess with other elements 
    }
}
const MAX_COUNT = 5;
//const serverUrl = 'opm-stream.onrender.com/'

let oldImages = [];
const EditTicketSection = () => {
    const params = useParams()
    const editorRef = useRef(null);
    const form = React.useRef();


    const [heading, setHeading] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [priority,setPriority] = useState("");

    const [eventName, setEventName] = useState("");

    const [location, setLocation] = useState("");
    const [attendies, setAttendies] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState("");
    const [reviews, setReviews] = useState("");
    

    const [lessonId, setLessonId] = useState("");
    const [message, setMessage] = useState("");
    const [details, setDetails] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);
    const inputFileRef = React.useRef();
    const imgRef = React.useRef();
    const navigate = useNavigate();
    const [allActive, setAllActive] = useState(false);
    const [type, setType] = useState('');
    const [data, setData] = useState('');



    const getSinglelesson = () => {
        DataService.getSingleTicket(params.id).then((data) => {
            setData(data?.data?.data);
            setHeading(data?.data?.data?.heading);
            setCategory(data?.data?.data?.category);
            setPriority(data?.data?.data?.priority);
            setDescription(data?.data?.data?.description)
            
            setLoading(false);
        });
    };
    console.log("Data:",data)
    useEffect(() => {
        getSinglelesson();
    }, [params.id])

    const onFileChangeCapture = (e) => {
        /*Selected files data can be collected here.*/
        const file = e.target.files[0]
        setFile(e.target.files)
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);
        reader.onloadend = function (theFile) {
            var image = new Image();
            image.src = theFile.target.result;
            imgRef.current.src = image.src

        }
    };
    const handleUploadedFiles = files => {
        const uploaded = (uploadedFiles ? uploadedFiles : []);
        let limitExceeded = false;
        let imageSrc = [];
        if (images.length) {
            images.map((img, i) => {
                imageSrc.push(img)
            });
        }
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                const reader = new FileReader();
                const url = reader.readAsDataURL(file);
                reader.onloadend = function (theFile) {
                    var image = new Image();
                    image.src = theFile.target.result;
                    imageSrc.push(image.src)
                }
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    toast.error(`You can only uploaded a maximun of ${MAX_COUNT} files`, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setFileLimit(true);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) {
            setUploadedFiles(uploaded);
            setImages(imageSrc);

        }
    }
    const onFileChangeCaptureMultiple = (e) => {
        const choosenFiles = Array.prototype.slice.call(e.target.files);
        handleUploadedFiles(choosenFiles)
    }

    const triggerFile = () => {
        /*Collecting node-element and performing click*/
        inputFileRef.current.click();
    };

    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    };

    const onChangeCategory = (e) => {
        const category = e.target.value;
        setCategory(category);
    };

    const onChangeName = (e) => {
        const heading = e.target.value;
        setHeading(heading);
    };

    const onChangePriority = (e) => {
        const priority = e.target.value;
        setPriority(priority);
    };



    const storedUserId = JSON.parse(localStorage.getItem("userId"));

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        const data = new FormData();
        if (file && file.length > 0) {
            setLoading(true);
            data.append('image', file[0])
            if (uploadedFiles && uploadedFiles.length > 0) {
                uploadedFiles.some((file) => {
                    data.append('image', file)
                })
            }
            data.append('category',category);
            data.append('heading', heading);
           //data.append('description', editorRef.current.getContent());
            data.append('description', description);

            data.append('priority', priority);
           // data.append('ownerId',storedUserId);

            DataService.updateTicket(params.id,data).then(
                () => {
                    toast.success('Ticket Updated successfully', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setTimeout(() => {
                        navigate("/ticket");
                        window.location.reload();
                    }, 2000); // Adjust the delay time as needed
                },
                    
                    //navigate("/ticket");
                    //window.location.reload();

                //},
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.msg) ||
                        error.message ||
                        error.toString();
                    setLoading(false);
                    toast.error(resMessage, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            );
        } else {
            toast.error('Please select Ticket thumbnail', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    return (


        <div className="container-fluid">
            <ToastContainer></ToastContainer>
            <div className="row">
                <div className="d-flex w-100 justify-content-between align-items-center mb-4">
                    <h4 className="mb-0">Edit Ticket</h4>
                    {/* <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#ImportProuct">Import Lesson</button> */}
                    <div class="modal fade" id="ImportProuct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">

                                <div class="modal-body bg-yellow">
                                    <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
                                    <div class="card-body p-4 importSectionModal bg-white rounded-5 m-5">

                                        <div class="mb-4">
                                            <label class="form-label">Upload File</label>
                                            <div class="upload-box">
                                                <i><svg width="47" height="39" viewBox="0 0 47 39" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 27.5L24 19.5L16 27.5" stroke="#F4AC3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M24 19.5V37.5" stroke="#F4AC3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M40.7799 32.28C42.7306 31.2165 44.2716 29.5337 45.1597 27.4972C46.0477 25.4607 46.2323 23.1864 45.6843 21.0334C45.1363 18.8803 43.8869 16.971 42.1333 15.6069C40.3796 14.2427 38.2216 13.5014 35.9999 13.5H33.4799C32.8745 11.1585 31.7462 8.98464 30.1798 7.14195C28.6134 5.29927 26.6496 3.83567 24.4361 2.86118C22.2226 1.8867 19.817 1.42669 17.4002 1.51573C14.9833 1.60478 12.6181 2.24057 10.4823 3.3753C8.34649 4.51003 6.49574 6.11417 5.06916 8.06713C3.64259 10.0201 2.6773 12.271 2.24588 14.6508C1.81446 17.0305 1.92813 19.477 2.57835 21.8065C3.22856 24.136 4.3984 26.2877 5.99992 28.1" stroke="#F4AC3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M32 27.5L24 19.5L16 27.5" stroke="#F4AC3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                                </i>
                                                <div class="ms-3">
                                                    <h5>Select a file or drag and drop here</h5>
                                                    <p class="mb-0 text-secondary">JPG, PNG or PDF, file size no more than 10MB</p>
                                                </div>
                                                <div class="upload-btn-wrapper ms-auto ms-3">
                                                    <button class="btn-file">Select file</button>
                                                    <input type="file" name="myfile" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-start btn-min-width">
                                            <button class="btn btn-primary">
                                                <span>Save</span>
                                            </button></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 login" ref={form}>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>4
                    </div>
                )}
                <div className="row">
                    <div className="col-xxl-3 col-lg-4">
                    <div className="card mb-4">
              <div className="card-body text=center">
                <h4 className="f-700">Thumbnail</h4>
                <div className="Camp-thumbnail" onClick={triggerFile}>
                {(data?.image ?
                    <img
                    style={{ width: "100%" }}
                    src={data?.image?.url}
                    ref={imgRef}
                    alt="ticket"
                  />
                                            :  
                                            <img
                    style={{ width: "100%" }}
                    src="../assets/img/img-placeholder.svg"
                    ref={imgRef}
                    alt="Camp"
                  />
                )}
            
                 
                </div>
                <p className="text-center">
                  Set the Ticket thumbnail image. Only *.png, *.jpg and *.jpeg
                  image files are accepted
                </p>
              </div>
              <input
                type="file"
                ref={inputFileRef}
                style={styles.input}
                onChangeCapture={onFileChangeCapture}
              />
            </div>

                    </div>
                    <div className="col-xxl-9 col-lg-8 ps-xxl-5 ps-md-3 ps-0">
                        <div className="card mb-5">
                            <div className="card-body p-4">

                                <div className="mb-3">
                                    <label className="form-label">Heading*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        value={heading}
                                        onChange={onChangeName}
                                        placeholder="Title Name" />
                                    {/* <div className="form-text">A Lesson name is required and recommended to be unique.</div> */}
                                </div>


                                <div className="mb-3">
                                <label className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    required
                                    value={category}
                                    onChange={onChangeCategory}
                                >
                                    <option value="" disabled selected>Select Category</option>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                    {/* Add more options as needed */}
                                </select>
                                </div>

                                <div className="mb-3">
                                <label className="form-label">Priority</label>
                                <select
                                    className="form-select"
                                    required
                                    value={priority}
                                    onChange={onChangePriority}
                                >
                                    <option value="" disabled selected>Select Priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                    {/* Add more options as needed */}
                                </select>
                                </div>


                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        placeholder="Description"
                                        className="form-control"
                                        value={description}
                                        onChange={onChangeDescription}
                                        rows="5"></textarea>
                {/* <Editor
                  apiKey="1nolfd56snnawdzchbfmu06ihvzd2nkhvgvdj5i85do1bws6"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue=" "
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style: "body { font-size:14px }",
                  }}
                /> */}

                                </div>

                        <div className="d-flex justify-content-end btn-min-width">
                                <button onClick={handleSubmit} className="btn btn-primary" >

                                    Save
                                </button>
                        </div>

                    </div>



                </div>
                    </div>
                </div>
            </form>
        </div>
       
    );
};

export default EditTicketSection;