

import React, { Component, useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../functions/auth";
import { FlexBox } from "../../styled/styles";
import imageNotFound from "../../images/image_not_found.png"
import editIcon from "../../images/editIcon.svg"
import trashIcon from "../../images/trashIcon.svg"
import { StyledButtonDelete } from "../../styled/globals/StyledRouterLink";
import { FileUploadButton } from "../../styled/globals/Button";
import { post } from "axios";
import { deleteProfileImage, uploadProfileImage } from "../../functions/images";
import { toast } from "react-toastify";
function Profiel(props) {
    const { user, setUser } = useContext(AuthContext)
    const [profileImg, setProfileImg] = useState('');
    const [loading, setLoading] = useState(false);
    const { naam, achterNaam } = props.match.params;
    const profiel = async () => {
        console.log(naam, "nek")
        // const { naam } = match.params;
        await loginUser("admin@gmail.com", "AdminUser!1").then((resp, err) => {
            if (err) {
                console.log(err);
            } else {
                setUser(resp.data)
                console.log(resp.data);

                // toast.error(err)
            }
        }).catch(err => {
            console.log(err);
            // toast.error("error")
            // console.log(err.response);
        })
    }
    useEffect(() => {
        profiel()
    }, [])

    const editButtonClick = () => {

    }

    const onChange = (e) => {
        setLoading(true);
        const url = `http://localhost:8080/images/user/${user.email}/upload`;
        console.log(e.target.files)
        if (e.target.files.length !== 0) {
            let image = URL.createObjectURL(e.target.files[0]);
            const formData = new FormData();
            let arrayFormFiles = Array.from(e.target.files);

            console.log(arrayFormFiles[0], "f1")
            formData.append("file", arrayFormFiles[0], arrayFormFiles[0].name);
            const config = {
                headers: {
                    authorization:
                        "Basic " + window.btoa("admin@gmail.com" + ":" + "AdminUser!1"),
                    "Access-Control-Allow-Origin": "*",
                    "content-type": "multipart/form-data",
                },
            };

            return post(url, formData, config).then((res, err) => {
                if (res) {
                    setProfileImg(image);
                    setLoading(false);
                    toast.success("profiel image succesvol veranderd");
                } else {
                    setLoading(false);
                    toast.error("Error met het submitten van een kamer");
                }
            }).catch((err) => {
                setLoading(false);
                toast.error("Error met het submitten van een kamer");
                return Promise.reject(err);
            });
            // uploadProfileImage(formData).then((res,err)=>{

            // }).catch((err) =>{
            //     setLoading(false);
            //     return Promise.reject(err);
            // })
        }
    }

    const deleteImage = (e) => {
        setLoading(true);
        console.log(profileImg, "profileImg")
        console.log((profileImg !== null), "pr1")
        if ((profileImg !== null)) {
            console.log(profileImg, "profileImg")
            deleteProfileImage(user.email).then((res, err) => {
                console.log(res, err, "kek")
                if (!(err === undefined)) {
                    console.log(profileImg, "profileImg")
                    setLoading(false)
                    toast.error("Error met   deleten van image")
                    console.log(err)
                } else{
                    setLoading(false)
                    setProfileImg('');
                    toast.success("Succesvol image verwijderd")

                }

            }).catch((err) => {
                console.log(profileImg, "profileImg")
                toast.error(err.response.data.message);
                setLoading(false);
                return Promise.reject(err);
            })
        } else {
            console.log(profileImg, "profileImg")
            setLoading(false)
            toast.error("Error met   deleten van image")
        }
    }

    return (
        <ProfielStyled>
            <FlexBox>
                {profileImg === '' ? <img src={imageNotFound} alt="image not found" className="profiel-img" /> : <img src={profileImg} alt="profiel image" className="profiel-img" />}

                <div className="button-image">
                    <FileUploadButton type="file" disabled={loading} name="profileImg" onChange={onChange} accept="image/png, image/jpg, image/jpeg" />
                    <FlexBox z="column" y="flex-start">
                        <div>

                            <StyledButtonDelete text="Delete foto" action={deleteImage} naam={user.email} icon={"fa-trash"}
                            />
                        </div>
                    </FlexBox>
                </div>
            </FlexBox>
            <FlexBox>

                {user.naam}
                hey from profiel
            </FlexBox>
        </ProfielStyled>
    )
}

const ProfielStyled = styled(FlexBox)`
.profiel-img{
    border-radius:50%;
    width:65vw;
    object-fit: cover;
    height:50vh;
    border-bottom-color: rgba(140, 130, 115);
     border: 5px solid;
}
.button-image{
    padding:10px;
    margin-left:-20vw;
    margin-bottom:-14vw;

}
.file-button{

}

`


export default Profiel

