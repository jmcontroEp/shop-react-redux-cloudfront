import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';

type CSVFileImportProps = {
	url: string;
	title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
	function encodeToBase64(value: string): string {
		const encoder = new TextEncoder();
		const encodedArray = encoder.encode(value);
		return btoa(String.fromCharCode(...encodedArray));
	}

	const username = 'jmcontroEp';
	const password = 'TEST_PASSWORD';

	const concatenatedValue = `${encodeToBase64(username)}:${encodeToBase64(
		password
	)}`;

	localStorage.setItem('authorization_token', concatenatedValue);

	const authorization_token = localStorage.getItem('authorization_token');
	const [file, setFile] = React.useState<File>();

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			setFile(file);
		}
	};

	const removeFile = () => {
		setFile(undefined);
	};

	const uploadFile = async () => {
		console.log('uploadFile to', url);

		// Get the presigned URL
		// const response = await axios({
		//   method: "GET",
		//   url,
		//   params: {
		//     name: encodeURIComponent(file.name),
		//     Authorization: Basic {authorization_token},
		//   },
		// });
		// console.log("File to upload: ", file.name);
		// console.log("Uploading to: ", response.data);
		// const result = await fetch(response.data, {
		//   method: "PUT",
		//   body: file,
		// });
		// console.log("Result: ", result);
		// setFile("");
	};

	return (
		<Box>
			<Typography variant='h6' gutterBottom>
				{title}
			</Typography>
			{!file ? (
				<input type='file' onChange={onFileChange} />
			) : (
				<div>
					<button onClick={removeFile}>Remove file</button>
					<button onClick={uploadFile}>Upload file</button>
				</div>
			)}
		</Box>
	);
}
