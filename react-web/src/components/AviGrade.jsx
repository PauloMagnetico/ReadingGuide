import Feedback from "./Feedback.jsx";

export default function AviGrade({ calculatedGrade, extractedText, showSnackBar }) {

    return (
        <div className="mt-2 p-4 bg-gray-100 rounded-xl border-8 border-double border-palette_4 text-center">Het leesniveau is: {calculatedGrade}
            <Feedback showSnackBar={showSnackBar} extractedText={extractedText} calculatedGrade={calculatedGrade}/>
        </div>
    )
}