import { useEffect, useRef } from "react"
import { CloudinaryContext} from 'cloudinary-react';

export const ProfilePictureUploadWidget = ({setImageURL}) => {
    const widgetRef = useRef();
    const cloudinaryRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
            cloudName: 'duy4yg4hz',
            uploadPreset: 'tdkborvg'
        },
        (error, result) => {
            if (result.event === 'success') {
                setImageURL(result.info.secure_url)
            }
        }
        );
    }, []);

    return <CloudinaryContext cloudName='duy4yg4hz'>
    <div>
        <button type="button" id="addPicture" className="button is-link post-list-header" onClick={() => widgetRef.current.open()}>
        Upload a Profile Picture
        </button>
    </div>
    </CloudinaryContext>
}