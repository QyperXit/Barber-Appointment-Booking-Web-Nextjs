import RequirePermission from "../../auth/requirePermission";

export default function AppointmentsLayout({ children }) {
  return (
    <RequirePermission permission="admin:true">{children}</RequirePermission>
  );
}
