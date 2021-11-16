import React from 'react'
import { useState } from 'react';

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    return (
        <div>
            hello from thereal fileupload component
        </div>
    )
}

export default FileUpload
