import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {deleteJob, editJob} from '../../actions/jobs';
import moment from "moment";
import {Link} from 'react-router-dom';
// import deleteJob from '../../actions/jobs';
import "../../static/style.css"


const TemplateRecruiter = ({jobs, deleteJob, editJob}) => {
    const code = jobs.map(({
            title,
            applications,
            positions,
            positionsfilled,
            applicationsapplied,
            deadline,
            skills,
            typeOfJob,
            duration,
            salary,
            date_of_posting,
            _id
        }) => <table className='table' key={_id}>
        {title ? 
<Fragment>
    
     <div class="job-post--title-wrapper">
       <h1>
       {title}
       <span class="public-salary-item"> ${salary}</span>
       </h1>
    </div>   
    
    
    
</Fragment>
: 
<Fragment> </Fragment>}
{applications ? 
<Fragment>
<div class="page-header">
<div class="list-jobs__details">
        <a href="#" class="picture">
            <div class="recruiter-images-container">
                <div id class="userpic-wrapper userpic-color_0 userpic_sm ">
                    <span class="userpic-initials"></span>
                    <div class="userpic-image"></div>
                </div>
            </div>
        </a>
        <div class="list-jobs__details__info">
        <li>Кількість заявок: {applicationsapplied} Залишилася кількість позицій: {positions - positionsfilled} Дата розміщення вакансії: {moment(date_of_posting).format('LLL')} Дедлайн подачі заявки: {moment(deadline).format('LLL')} Тип роботи: {typeOfJob} Тривалість: {duration}</li>
        </div>           
    </div>
    </div>
       
        
    
</Fragment>
: 
<Fragment> </Fragment>}
{positions ? 
<Fragment>
   
</Fragment>
: 
<Fragment> </Fragment>}
{date_of_posting ? 
    <Fragment>
        
    </Fragment>
    : 
    <Fragment> </Fragment>}
    
{deadline ? 
<Fragment>
    
</Fragment>
: 
<Fragment> </Fragment>}
{salary ? 
<Fragment>
    
</Fragment>
: 
<Fragment> </Fragment>}
{skills ? 
<Fragment>
   
        <div class="profile-page-section">{skills}</div>
   
       
    
</Fragment>
: 
<Fragment> </Fragment>}

{typeOfJob ? 
<Fragment>
    
</Fragment>
: 
<Fragment> </Fragment>}
{duration ? 
<Fragment>
   
</Fragment>
: 
<Fragment> </Fragment>}
    <p class="text-danger">
    <Link to={`/viewapplication/${_id}`} className="btn btn-primary">Перегляд заявок</Link>
    </p>
    <p class="text-danger">
    <button className='btn btn-danger' onClick={() => {deleteJob(_id) }}>Видалити вакансію</button>
    {/* <td><Link className='btn btn-primary' to={`/editjob/${_id}`} >Edit Job</Link></td> */}
    </p>
    
    
</table>)
    return (
        <Fragment>
            <h2>Вакансії, опубліковані мною</h2>
            <td><Link className='btn btn-success' to='/successjob' >Переглянути кандидатів, які приєдналися до цього рекрутера</Link></td>
            {code}
        </Fragment>
    );
}

TemplateRecruiter.propTypes = {
    jobs: PropTypes.array.isRequired,
    deleteJob: PropTypes.func.isRequired,
    editJob: PropTypes.func.isRequired,
}

export default connect(null, {deleteJob, editJob})(TemplateRecruiter);
