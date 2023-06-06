import React from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import star from '../assets/star.png'
import {useNavigate} from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'

const DeviceItem = ({device}) => {
    const navigate = useNavigate()
  return (
    <Col md={3} className={"mt-4"} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
        <Card style = {{width : 160, cursor: 'pointer'}} border={"light"}>
            <Image width = {160} height = {160} src={process.env.REACT_APP_API_URl + device.img}/>
            <div className="text-black-50 mt-l d-flex justify-content-between align-items-center">
                <div>Samsung...</div>
                <div className="d-flex align-items-center">
                    <div>{device.rating}</div>
                    <Image width = {18} height={18} src = {star}/>
                </div>
            </div>
            <div>{device.name}</div>
        </Card>
    </Col>
  )
}

export default DeviceItem