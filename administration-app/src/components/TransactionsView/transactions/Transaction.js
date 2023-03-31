import cn from '../css/Transactions.module.css';
import { parseDate } from './../../../services/TransactionsView/transactionsService';
export default function Transaction(arg) {
	return (
		<div className={cn.transaciton_root}>
			<table className={cn.table}>
				<tbody>
					<tr>
						<td>{arg.prop.id}</td>
						<td>{parseDate(arg.prop.dateTime)}</td>
						<td>{arg.prop.recipient}</td>
						<td>{arg.prop.amount}</td>
						<td>{arg.prop.status}</td>
						<td>
							<div className={cn.detailsBtnDiv}>
								<button
									className={cn.detailsBtn}
									onClick={() => {
										arg.setDetails(arg.prop);
									}}
								>
									<p>Details</p>
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
