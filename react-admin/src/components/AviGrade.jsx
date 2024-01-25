import Feedback from "./Feedback.jsx";

export default function AviGrade({ calculatedGrade, extractedText, showSnackBar }) {

    return (
        <div className="mt-2 p-1 rounded border-2 border-black text-center">Het leesniveau is: {calculatedGrade}
            <Feedback showSnackBar={showSnackBar} extractedText={extractedText} calculatedGrade={calculatedGrade}/>
        </div>
    )
}