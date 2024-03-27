'use client';

import { useState } from 'react';

import {
	evaluateResponse,
	formulateComplaint,
	generateCompanyProfile,
	generateCustomerPersona,
	generateProductInformation,
} from '@/actions/chat';
import CompanyProfile from '@/components/CompanyProfile';
import ComplaintTrainer from '@/components/ComplaintTrainer';
import CustomerPersona from '@/components/CustomerPersona';
import Evaluation from '@/components/Evaluation';
import ProductInformation from '@/components/ProductInformation';

function CustomerServiceTrainerPage() {
	const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
	const [customerPersona, setCustomerPersona] = useState<CustomerPersona | null>(null);
	const [productInformation, setProductInformation] = useState<ProductInformation | null>(null);
	const [evaluation1, setEvaluation1] = useState<Evaluation | null>(null);
	const [evaluation2, setEvaluation2] = useState<Evaluation | null>(null);
	const [evaluation3, setEvaluation3] = useState<Evaluation | null>(null);
	const [evaluation4, setEvaluation4] = useState<Evaluation | null>(null);
	const [evaluation5, setEvaluation5] = useState<Evaluation | null>(null);
	const [complaint, setComplaint] = useState<string | null>(null);
	const [finalResponse1, setFinalResponse1] = useState<string | null>(null);
	const [finalResponse2, setFinalResponse2] = useState<string | null>(null);
	const [finalResponse3, setFinalResponse3] = useState<string | null>(null);
	const [finalResponse4, setFinalResponse4] = useState<string | null>(null);
	const [finalResponse5, setFinalResponse5] = useState<string | null>(null);
	const [finalGuidelines1, setFinalGuidelines1] = useState<string | null>(null);
	const [finalGuidelines2, setFinalGuidelines2] = useState<string | null>(null);
	const [finalGuidelines3, setFinalGuidelines3] = useState<string | null>(null);
	const [finalGuidelines4, setFinalGuidelines4] = useState<string | null>(null);
	const [finalGuidelines5, setFinalGuidelines5] = useState<string | null>(null);
	const [evaluating, setEvaluating] = useState<boolean>(false);
	const fetchCompanyProfile = async (spice: string) => {
		const res = await generateCompanyProfile(spice);
		setCompanyProfile(res);
	};
	const fetchCustomerPersona = async () => {
		const res = await generateCustomerPersona(companyProfile as CompanyProfile);
		setCustomerPersona(res);
	};
	const fetchProductInformation = async () => {
		const res = await generateProductInformation(
			companyProfile as CompanyProfile,
			customerPersona as CustomerPersona,
		);
		setProductInformation(res);
	};
	const fetchComplaint = async () => {
		const res = await formulateComplaint(
			companyProfile as CompanyProfile,
			customerPersona as CustomerPersona,
			productInformation as ProductInformation,
		);
		setComplaint(res);
	};
	const fetchEvaluation1 = async () => {
		setEvaluating(true);

		const res = await evaluateResponse(
			companyProfile as CompanyProfile,
			customerPersona as CustomerPersona,
			productInformation as ProductInformation,
			complaint as string,
			finalResponse1 as string,
		);
		setEvaluation1(res);
		setEvaluating(false);
	};
	const fetchEvaluation2 = async () => {
		setEvaluating(true);

		const res = await evaluateResponse(
			companyProfile as CompanyProfile,
			customerPersona as CustomerPersona,
			productInformation as ProductInformation,
			complaint as string,
			finalResponse2 as string,
		);
		setEvaluation2(res);
		setEvaluating(false);
	};
	const fetchEvaluation3 = async () => {
		setEvaluating(true);

		const res = await evaluateResponse(
			companyProfile as CompanyProfile,
			customerPersona as CustomerPersona,
			productInformation as ProductInformation,
			complaint as string,
			finalResponse3 as string,
		);
		setEvaluation3(res);
		setEvaluating(false);
	};
	const fetchEvaluation4 = async () => {
		setEvaluating(true);

		const res = await evaluateResponse(
			companyProfile as CompanyProfile,
			customerPersona as CustomerPersona,
			productInformation as ProductInformation,
			complaint as string,
			finalResponse4 as string,
		);
		setEvaluation4(res);
		setEvaluating(false);
	};
	const fetchEvaluation5 = async () => {
		setEvaluating(true);

		const res = await evaluateResponse(
			companyProfile as CompanyProfile,
			customerPersona as CustomerPersona,
			productInformation as ProductInformation,
			complaint as string,
			finalResponse5 as string,
		);
		setEvaluation5(res);
		setEvaluating(false);
	};
	return (
		<div className="flex flex-col gap-8">
			<CompanyProfile
				fetchCompanyProfile={fetchCompanyProfile}
				companyProfile={companyProfile}
			/>
			{companyProfile && (
				<CustomerPersona
					fetchCustomerPersona={fetchCustomerPersona}
					customerPersona={customerPersona}
				/>
			)}
			{customerPersona && (
				<ProductInformation
					productInformation={productInformation}
					fetchProductInformation={fetchProductInformation}
				/>
			)}
			{productInformation && (
				<ComplaintTrainer
					complaint={complaint}
					finalResponse={finalResponse1}
					fetchComplaint={fetchComplaint}
					customerName={customerPersona?.name as string}
					setFinalGuidelines={setFinalGuidelines1}
					setFinalResponse={setFinalResponse1}
				/>
			)}
			{finalGuidelines1 && (
				<Evaluation
					finalResponse={finalResponse1 as string}
					evaluating={evaluating}
					evaluation={evaluation1}
					fetchEvaluation={fetchEvaluation1}
				/>
			)}
			{evaluation1 && (
				<ComplaintTrainer
					complaint={complaint}
					finalResponse={finalResponse2}
					fetchComplaint={fetchComplaint}
					customerName={customerPersona?.name as string}
					setFinalGuidelines={setFinalGuidelines2}
					setFinalResponse={setFinalResponse2}
				/>
			)}
			{finalGuidelines2 && (
				<Evaluation
					finalResponse={finalResponse2 as string}
					evaluating={evaluating}
					evaluation={evaluation2}
					fetchEvaluation={fetchEvaluation2}
				/>
			)}
			{evaluation2 && (
				<ComplaintTrainer
					complaint={complaint}
					finalResponse={finalResponse3}
					fetchComplaint={fetchComplaint}
					customerName={customerPersona?.name as string}
					setFinalGuidelines={setFinalGuidelines3}
					setFinalResponse={setFinalResponse3}
				/>
			)}
			{finalGuidelines3 && (
				<Evaluation
					finalResponse={finalResponse3 as string}
					evaluating={evaluating}
					evaluation={evaluation3}
					fetchEvaluation={fetchEvaluation3}
				/>
			)}
			{evaluation3 && (
				<ComplaintTrainer
					complaint={complaint}
					finalResponse={finalResponse4}
					fetchComplaint={fetchComplaint}
					customerName={customerPersona?.name as string}
					setFinalGuidelines={setFinalGuidelines4}
					setFinalResponse={setFinalResponse4}
				/>
			)}
			{finalGuidelines4 && (
				<Evaluation
					finalResponse={finalResponse4 as string}
					evaluating={evaluating}
					evaluation={evaluation4}
					fetchEvaluation={fetchEvaluation4}
				/>
			)}
			{evaluation4 && (
				<ComplaintTrainer
					complaint={complaint}
					finalResponse={finalResponse5}
					fetchComplaint={fetchComplaint}
					customerName={customerPersona?.name as string}
					setFinalGuidelines={setFinalGuidelines5}
					setFinalResponse={setFinalResponse5}
				/>
			)}
			{finalGuidelines5 && (
				<Evaluation
					finalResponse={finalResponse5 as string}
					evaluating={evaluating}
					evaluation={evaluation5}
					fetchEvaluation={fetchEvaluation5}
				/>
			)}
		</div>
	);
}

export default CustomerServiceTrainerPage;
