import Feedback from "./Feedback";
import { AviGrade, Severity } from "../models/enums";
import React from "react";

interface AviGradeShowProps {
    calculatedGrade: AviGrade;
    extractedText: string;
    showSnackBar: (severity: Severity, message: string) => void;
};

const AviGradeShow: React.FC<AviGradeShowProps> = ({ 
    calculatedGrade, 
    extractedText, 
    showSnackBar 
}) => {
    return (
        <div className="mt-2 p-4 bg-gray-100 rounded-xl border-8 border-double border-palette_4 text-center">Het leesniveau is: {calculatedGrade}
            <Feedback showSnackBar={showSnackBar} extractedText={extractedText} calculatedGrade={calculatedGrade}/>
        </div>
    )
}

export default AviGradeShow;