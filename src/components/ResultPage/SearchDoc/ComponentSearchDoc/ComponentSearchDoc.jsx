import React from "react";
import ComponentImage from "../../../CustomComponents/ComponentImage/ComponentImage";
import ComponentText from "../../../CustomComponents/ComponentText/ComponentText";
import { CustomButton } from "../../../CustomComponents/CustomButton/CustomButton";
import { CustomCard } from "../../../CustomComponents/CustomCard/CustomCard";
import { Colors } from "../../../../theme/Colors/Colors";
import "./ComponentSearchDoc.css";

const ComponentSearchDoc = (props) => {
	function returnText(text)
	{
		if (text.indexOf('?xml'))
			return "Текст невозможно загрузить";
		return text;							
	}
	return (
		<>
			<div>
				<div className="flex">
					<div>
						<ComponentText style={{
							fontSize: "16px",
							fontWeight: "500",
							lineHeight: "20px",
							marginTop: "5px",
							textAlign: "left",
							color: Colors.colorGray
						}}>
							{props.textDate}
						</ComponentText>
					</div>
					<div>
						<ComponentText style={{
							fontSize: "16px",
							fontWeight: "500",
							lineHeight: "20px",
							marginTop: "5px",
							marginLeft: "15px",
							textAlign: "left",
							textDecoration: "underline",
							color: Colors.colorGray
						}}>
							{props.textSource}
						</ComponentText>
					</div>
				</div>
				<div>
					<ComponentText style={{
						fontSize: "26px",
						fontWeight: "500",
						lineHeight: "36px",
						marginTop: "20px",
						textAlign: "left",
						color: props.colorText
					}}>
						{props.textHeader}
					</ComponentText>
				</div>
				<div>
					<ComponentText style={{
						fontSize: "12px",
						fontWeight: "400",
						lineHeight: "15px",
						marginTop: "20px",
						marginBottom: "20px",
						textAlign: "left"
					}}>
						<span className="span_div">{props.textType}</span>
					</ComponentText>
				</div>
				<ComponentImage source={props.image} width="30%">

				</ComponentImage>
				<div>
					<ComponentText style={{
						fontSize: "16px",
						fontWeight: "500",
						lineHeight: "20px",
						marginTop: "20px",
						textAlign: "left",
						color: props.colorText
					}}>
						{returnText(props.text)}
					</ComponentText>
				</div>
				<div className="left">
					<CustomButton variant='lightblue'>
						<a className = "a_div" 
						target = "blank"
						href = {props.url}>Читать в источнике</a>
					</CustomButton>
				</div>
				<div>
					<ComponentText style={{
						fontSize: "16px",
						fontWeight: "400",
						lineHeight: "20px",
						marginTop: "20px",
						textAlign: "right",
						color: Colors.colorGray
					}}>
						{props.textNumWord}
					</ComponentText>
				</div>
			</div>

		</>
	)
}

export default ComponentSearchDoc
