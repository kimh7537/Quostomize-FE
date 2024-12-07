"use client"

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

import LoadingSpinner from "../overlay/loadingSpinner";
import LoginForm from "./loginForm";
import ErrorModal from "./errorModal";

const LoginContent = () => {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [formData, setFormData] = useState({
      memberLoginId: '',
      memberPassword: '',
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      if (session) {
        router.push('/home');
      }
    }, [session, router]);
  
    useEffect(() => {
      setIsFormValid(
        formData.memberLoginId.length > 0 && formData.memberPassword.length > 0
      );
    }, [formData]);
  
    let redirectTo = searchParams.get('to') ? '/' + searchParams.get('to') : '/home';
  
    const handleLogin = async (e) => {
      e.preventDefault();
      let isAuthed = true;
      setIsLoading(true);
  
      try {
        const response = await signIn('credentials', {
          memberLoginId: formData.memberLoginId,
          memberPassword: formData.memberPassword,
          redirect: false,
        });
        if (response.error) {
          setShowErrorModal(true);
          isAuthed = false;
        }
      } catch (err) {
        isAuthed = false;
        setShowErrorModal(true);
      } finally {
        setIsLoading(false);
        if (isAuthed) {
          if (isAuthed) {
            router.push(redirectTo);
          }
        }
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    // LoginPage 컴포넌트에서 버튼 핸들러 추가
    const handleFindId = () => {
      router.push('/find-id');
    };
  
    const handleFindPassword = () => {
      router.push('/find-password');
    };

    return (
        <div className="w-full px-6 pt-12 pb-28">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold color1 mb-3">
              커스터마이징 카드
            </h1>
            <p className="text-base text-gray-900">
              서비스 이용을 위해 로그인해주세요.
            </p>
          </div>

        <div className="relative mt-20">
          <div className="inset-x-0 -top-20">
            <div className="max-w-lg mx-auto px-5">
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-center mb-8">로그인</h2>
                <LoginForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  isFormValid={isFormValid}
                  onSubmit={handleLogin}
                />
                <div className="mt-6 flex items-center justify-center space-x-4 text-sm">
                  <button
                    onClick={handleFindId}
                    className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
                  >
                    아이디 찾기
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={handleFindPassword}
                    className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
                  >
                    비밀번호 찾기
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => router.push('/signup')}
                    className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
                  >
                    회원가입
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLoading && <LoadingSpinner message="로그인 중입니다..." />}
        <ErrorModal
          isOpen={showErrorModal}
          onClose={() => setShowErrorModal(false)}
        />
      </div>
    );
}

export default LoginContent;