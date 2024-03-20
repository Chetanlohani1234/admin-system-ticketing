import React, { useEffect, useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { useNavigate } from "react-router-dom";
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
const AddTicketSection = () => {
    const editorRef = useRef(null);
    const form = React.useRef();
    const [data,setData] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [heading, setHeading] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [priority,setPriority] = useState("");

 
    

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);
    const inputFileRef = React.useRef();
    const imgRef = React.useRef();
    const navigate = useNavigate();

    // useEffect(() => {
    //     // getData();
    // }, [images]);

    const storedUserId = JSON.parse(localStorage.getItem("userId"));
    useEffect(() => {
        document.title = "My Profile";
        getData();
    }, [storedUserId]);
  
    const getData = () => {
        DataService.getUserDetail(storedUserId).then((data) => {
            setData(data.data.data);
            setName(data.data.data.name);
            setEmail(data.data.data.email);
            setLoading(false);
        }).catch((error)=>{
            const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  
           setLoading(false);
            toast.error(resMessage, {
                position: toast.POSITION.TOP_RIGHT
            });
        });
    }


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
    const onChangeName = (e) => {
        const heading = e.target.value;
        setHeading(heading);
    };



    const onChangeCategory = (e) => {
        const category = e.target.value;
        setCategory(category);
    };

    const onChangePriority = (e) => {
        const priority = e.target.value;
        setPriority(priority);
    };


    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    };

 

    const triggerFile = () => {
        /*Collecting node-element and performing click*/
        inputFileRef.current.click();
    };


    //const storedUserId = JSON.parse(localStorage.getItem("userId"));
    console.log ('user_id',storedUserId);


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
            data.append('description', description);
            data.append('priority', priority);
            data.append('user_id',storedUserId);


            DataService.addTicketing(data).then(
                () => {
                    toast.success('Ticket added successfully', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    // setTimeout(() => {
                    //     navigate("/ticket");
                    //     window.location.reload();
                    // }, 2000); // Adjust the delay time as needed
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

    const deleteImage = (e, index, api = true) => {
        if (uploadedFiles && uploadedFiles.length > 0) {
            var uploaded = uploadedFiles.filter((file, i) => {
                return index != i
            })
            var imageSrc = [];
            var ss = uploaded.some((file) => {
                const reader = new FileReader();
                const url = reader.readAsDataURL(file);
                reader.onloadend = function (theFile) {
                    var image = new Image();
                    image.src = theFile.target.result;
                    imageSrc.push(image.src)
                }
            })
            setUploadedFiles(uploaded);
            setImages(imageSrc);
        }
    }
    return (
        <div className="container-fluid">
            <ToastContainer></ToastContainer>
            <div className="row">
                <div className="d-flex w-100 justify-content-between align-items-center mb-4">
                    <h4 className="mb-0">Add Ticket</h4>
                    {/* <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#ImportProuct">Import Venue</button> */}
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
          
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <div className="row">
                    <div className="col-xxl-3 col-lg-4">
                        <div className="card mb-4">
                            <div className="card-body text=center">
                                <h4 className="f-700">Thumbnail</h4>
                                {/* <div className="Delete-image"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.410582 0.410749C0.736019 0.0853125 1.26366 0.0853125 1.58909 0.410749L5.99984 4.82149L10.4106 0.410749C10.736 0.0853125 11.2637 0.0853125 11.5891 0.410749C11.9145 0.736186 11.9145 1.26382 11.5891 1.58926L7.17835 6.00001L11.5891 10.4108C11.9145 10.7362 11.9145 11.2638 11.5891 11.5893C11.2637 11.9147 10.736 11.9147 10.4106 11.5893L5.99984 7.17852L1.58909 11.5893C1.26366 11.9147 0.736019 11.9147 0.410582 11.5893C0.0851447 11.2638 0.0851447 10.7362 0.410582 10.4108L4.82133 6.00001L0.410582 1.58926C0.0851447 1.26382 0.0851447 0.736186 0.410582 0.410749Z" fill="black" />
                                </svg>
                                </div> */}
                                <div className="Lesson-thumbnail" onClick={triggerFile}>
                                    <img style={{ width: '100%' }} src="../assets/img/img-placeholder.svg" ref={imgRef} />
                                </div>
                                <p className="text-center">Set the Venue thumbnail image. Only
                                    *.png, *.jpg and *.jpeg image files
                                    are accepted</p>
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
                                    <label className="form-label">Name:*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        value={name}
                                     />
                                    {/* <div className="form-text">A Lesson name is required and recommended to be unique.</div> */}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        value={email}
                                        //onChange={onChangeName}
                                     />
                                    {/* <div className="form-text">A Lesson name is required and recommended to be unique.</div> */}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Subject*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        onChange={onChangeName}
                                        placeholder="Title Name" />
                                    {/* <div className="form-text">A Lesson name is required and recommended to be unique.</div> */}
                                </div>


                                <div className="mb-3">
                                <label className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    required
                                    onChange={onChangeCategory}
                                >
                                    <option value="" disabled selected>Select Category</option>
                                    <option value="general">General</option>
                                    <option value="support">Support</option>
                                    <option value="advertising">Advertising</option>
                                    <option value="billing">Billing</option>

                                    {/* Add more options as needed */}
                                </select>
                                </div>

                                <div className="mb-3">
                                <label className="form-label">Priority</label>
                                <select
                                    className="form-select"
                                    required
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
           
        </div>
    );
};

export default AddTicketSection;