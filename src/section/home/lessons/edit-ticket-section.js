import React, { useEffect, useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import TagsInput from '../../../common/TagsInput'
import 'react-toastify/dist/ReactToastify.css';
import '../lessons/edit-ticket-section.css'
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
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [commentId, setCommentId] = useState(null);
    const [postId,setPostId] = useState(" ");

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
    const [editorContent, setEditorContent] = useState('');



    const getSinglelesson = () => {
        DataService.getSingleTicket(params.id).then((data) => {
            setData(data?.data?.data);
            setPostId(data?.data?.data?._id);
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

    // useEffect(() => {
    //     // Fetch comments when the component mounts
    //     getComments();
    // }, [params.id]);

    // // Function to fetch comments
    // const getComments = () => {
    //     DataService.getComments(params.id)
    //         .then(response => {
    //             // Set comments in state
    //             setComments(response.data.comment);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching comments:', error);
    //         });
    // };

    useEffect(() => {
        getComments();
    }, []);

    const getComments = () => {
        DataService.getComment().then((data) => {
           // const filteredComments = data?.data?.data?.comment.filter(comment => comment.post_id === postId);
           //const filteredComments = data?.data?.data?.filter(comment => comment.post_id._id === postId);
           const filteredComments = data?.data?.data?.map(item => item.comment).filter(comment => comment.post_id._id === postId);
           setComments(filteredComments);
            setLoading(false);
           // console.log("comments:", comments); // Log comments after setting the state
        }).catch((error) => {
            setLoading(false);
            setMessage(error?.response?.data?.msg)
        });
    };
    
    
    console.log("comments",comments);

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

    const handleEditorChange = (content, editor) => {
        setEditorContent(content);
    };
    console.log("dcdcdcdxc",editorContent);



    const storedUserId = JSON.parse(localStorage.getItem("userId"));

    // Function to handle comment submission
    const handleSubmit = (e) => {
        e.preventDefault();
        //Check if comment is empty
        // if (!comment.trim()) {
        //     toast.error('Comment cannot be empty', { position: toast.POSITION.TOP_RIGHT });
        //     return;
        // }

        const data = {
            user_id : storedUserId,
            post_id : postId,
            comment : editorContent,
        }
        // Submit comment
        DataService.submitComment(data)
            .then(response => {
                // Clear comment input
                setEditorContent('');
                // Fetch updated comments
                getComments();
                // Show success message
                toast.success('Comment submitted successfully', { position: toast.POSITION.TOP_RIGHT });
            })
            .catch(error => {
                console.error('Error submitting comment:', error);
                // Show error message
                toast.error('Failed to submit comment', { position: toast.POSITION.TOP_RIGHT });
            });
    };

    console.log("Data comment ID",commentId);

    return (


        <div className="container-fluid">
            <ToastContainer></ToastContainer>

            <form onSubmit={handleSubmit} className="mt-4 login" ref={form}>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>4
                    </div>
                )}

                <div className="row">
                   <div className="col-xxl-7 col-lg-8 ps-xxl-5 ps-md-3 ps-0">
                        <div className="card mb-5">
                            <div className="card-body p-4">
                                {heading} {"   "} 
                                {new Date(data.createdAt).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}<br/><br/>
                                <h6>Contact : {data?.user_id?.name}</h6>
                                <h6>Email : {data?.user_id?.email}</h6>
                                <h6>Phone Number : {data?.user_id?.phoneNo}</h6>
                                {description}
                            </div>
                       </div>
                    </div>


                    <div className="col-xxl-5 col-lg-4 ps-xxl-5 ps-md-3 ps-0">
                        <div className="card mb-5">
                            <div className="card-body p-4">
                                

                                        <Link to={"/edit-ticket/" + data._id} className="edit-button"><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.8415 0.623009C13.0368 0.427747 13.3534 0.427747 13.5486 0.623009L16.5486 3.62301C16.7439 3.81827 16.7439 4.13485 16.5486 4.33012L6.54864 14.3301C6.50076 14.378 6.44365 14.4157 6.38078 14.4408L1.38078 16.4408C1.19507 16.5151 0.982961 16.4715 0.84153 16.3301C0.700098 16.1887 0.656561 15.9766 0.730845 15.7909L2.73084 10.7909C2.75599 10.728 2.79365 10.6709 2.84153 10.623L12.8415 0.623009ZM11.9022 2.97656L14.1951 5.26946L15.488 3.97656L13.1951 1.68367L11.9022 2.97656ZM13.488 5.97656L11.1951 3.68367L4.69508 10.1837V10.4766H5.19508C5.47123 10.4766 5.69508 10.7004 5.69508 10.9766V11.4766H6.19508C6.47123 11.4766 6.69508 11.7004 6.69508 11.9766V12.4766H6.98798L13.488 5.97656ZM3.72673 11.152L3.62121 11.2575L2.09261 15.079L5.9141 13.5504L6.01963 13.4449C5.83003 13.3739 5.69508 13.191 5.69508 12.9766V12.4766H5.19508C4.91894 12.4766 4.69508 12.2527 4.69508 11.9766V11.4766H4.19508C3.98068 11.4766 3.79779 11.3416 3.72673 11.152Z" fill="#2166a5" />
                                        </svg>
                                         Edit
                                        </Link>


                                <h5>Ticket Status:</h5>

                                <div className="mb-3">
                                <label className="form-label">Category:</label>
                                    <select
                                        className="form-select"
                                        required
                                        value={category}
                                        onChange={onChangeCategory}
                                        style={{ width: '150px', height: '40px', backgroundColor: 'lightgray', border: '1px solid gray', display: 'inline-block',marginLeft:'25px' }}

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
                                <label className="form-label">Priority:</label>
                                <select
                                    className="form-select"
                                    required
                                    value={priority}
                                    onChange={onChangePriority}
                                    style={{ width: '150px', height: '40px', backgroundColor: 'lightgray', border: '1px solid gray', display: 'inline-block',marginLeft:'40px' }}
                                >

                                
                                    <option value="" disabled selected>Select Priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                    {/* Add more options as needed */}
                                </select>
                               </div>


                            </div>
                       </div>
                    </div>

                    {/* <div className="col-xxl-7 col-lg-8 ps-xxl-5 ps-md-3 ps-0">
      <div className="card mb-5">
        <div className="card-body p-4">
          {comment == '{data._id}' && (
            <div className="mb-3">
              <p>Comment by: [Name]</p>
              <p>{comment}</p>
            </div>
          )}
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="form-control"
                //onChange={onChangeDescription}
                rows="10">
            </textarea>
        </div>
      </div>
                    </div> */}
                    
                    <div className="col-xxl-7 col-lg-8 ps-xxl-5 ps-md-3 ps-0">
                        <div className="card mb-5">
                            <div className="card-body p-4">
                            <Editor
                                apiKey="1nolfd56snnawdzchbfmu06ihvzd2nkhvgvdj5i85do1bws6"
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                initialValue=" "
                                value={editorContent}
                                onEditorChange={handleEditorChange}
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
                            />

                            <div className="attachment-container">
                                <h3>Attachments:</h3>
                                <label htmlFor="file-upload" className="custom-file-upload">
                                    <i className="fa fa-cloud-upload"></i> Upload File
                                </label>
                                <input id="file-upload" type="file" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Change priority to</label>
                                <select
                                    className="form-select"
                                    required
                                    value={priority}
                                    onChange={onChangePriority}
                                    style={{ width: '100px', height: '40px', backgroundColor: 'lightgray', border: '1px solid gray', display: 'inline-block',marginLeft:'10px' }}
                                >
                                    <option value="" disabled selected>Select Priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                    {/* Add more options as needed */}
                                </select>
                               </div>

                               <div className="d-flex justify-content-end btn-min-width">
                                <button onClick={handleSubmit} className="btn btn-primary" >

                                    <span>Submit</span>
                                </button>

                                {/* {comments.map((comment, index) => (
                                    <div key={index} className="mb-3">
                                        <p>Comment by: {comment.username}</p>
                                        <p>{comment.text}</p>
                                    </div>
                                ))} */}

                            </div>


                            </div>
                       </div>
                    </div>

                    <div className="col-xxl-5 col-lg-4 ps-xxl-5 ps-md-3 ps-0">
                        <div className="card mb-5">
                            <div className="card-body p-4">
                              <div className="mb-3">
                                <h4>Ticket Details</h4><br/>
                                <h6 style={{fontSize:'16px'}}>Tracking ID:{data._id}</h6>
                                <h6 style={{fontSize:'16px',marginTop:'20px'}}>Created on: {data.createdAt}</h6>
                                <h6 style={{fontSize:'16px',marginTop:'20px'}}>Updated: {data.updatedAt}</h6>
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