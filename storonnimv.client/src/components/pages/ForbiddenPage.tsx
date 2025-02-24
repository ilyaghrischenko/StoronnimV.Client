import React from "react";

const ForbiddenPage: React.FC = () => {
    return (
        <div className="text-center">
            <h1>403: Forbidden</h1>
            <p>У вас немає доступу до цієї сторінки.</p>
        </div>
    );
};

export { ForbiddenPage };
