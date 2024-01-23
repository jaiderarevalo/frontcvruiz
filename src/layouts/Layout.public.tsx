import { Outlet } from 'react-router-dom';


const LayoutPublic = () => {
	return (
		<div>
			<Outlet />
			<div className='text-center py-6'>
				<p className='dark:text-white'>
					Jaider Ruiz {new Date().getFullYear()}
				</p>
			</div>
		</div>
	);
};

export default LayoutPublic;